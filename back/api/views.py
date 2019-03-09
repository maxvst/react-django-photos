import os
import base64
import re
import sys
import mimetypes

from functional import seq
from PIL import Image
from resizeimage import resizeimage
from io import BytesIO

from django.shortcuts import render
from django.http import JsonResponse, HttpResponse, FileResponse

from photos.settings import IMAGES_SOURCE

def index(request):
    return HttpResponse("Hello, world. You're at index.")

def base(request, id):
    # limit = int(request.GET.get('limit', '10'))
    # offset = int(request.GET.get('offset', '0'))
    dir = os.path.join(IMAGES_SOURCE, id)

    total_images = seq(os.listdir(dir))\
        .filter(lambda filename: os.path.isfile(os.path.join(dir, filename)))\
        .count(lambda filename: True)
    
    # TODO: перенести создание миниатюр в эндпоинт image
    # result = images\
    #     .drop(offset)\
    #     .take(limit)\
    #     .map(lambda x: {\
    #         'id': base64.b64encode(bytes(id + '/' + x, 'utf-8')).decode('utf-8'),\
    #         'title': x,\
    #         'image': getSmallBase64Image(os.path.join(dir, x))
    #     })\
    #     .to_list()
    
    return JsonResponse({ 'id': id, 'name': 'id',  'total_images': total_images })

def bases(request):
    search = request.GET.get('search', None)
    limit = int(request.GET.get('limit', '10'))
    offset = int(request.GET.get('offset', '0'))

    base_seq = seq(os.listdir(IMAGES_SOURCE))\
        .filter(lambda filename: os.path.isdir(os.path.join(IMAGES_SOURCE, filename)))

    if search is not None:
        regexp = re.compile(search, re.IGNORECASE)
        base_seq = bases.filter(lambda filename: regexp.match(filename) is not None)

    total = base_seq.count(lambda filename: True)

    result = base_seq\
        .sorted()\
        .drop(offset)\
        .take(limit)\
        .map(lambda filename: {'id': filename, 'title': filename})\
        .to_list()
    
    return JsonResponse({'total': total, 'result': result})

def image(request, id):
    
    target = request.GET.get('target', 'native')
    [dir_name, image_name] = base64.b64decode(id).decode('utf-8').split('/')
    image_path = os.path.join(IMAGES_SOURCE, dir_name, image_name)

    if target == 'native':
        # TODO: обработать ситуацию, при которой отсутствует файл или нет прав на его открытие
        # TODO: проверить, что передаются все необходимые заголовки
        # TODO: проверить, что закрывается файловый десткриптор
        return FileResponse(open(image_path, 'rb'))
    
    if target == 'description':
        if os.path.isfile(image_path):
            return JsonResponse({'id': id, 'album_id': dir_name, 'album_name': dir_name, 'title': image_name })
        return JsonResponse({'error': 'NOT FOUND', 'description': 'Изображение не найдено.'}, status=404)

    if target == 'small':
        # TODO: обработать ситуацию, при которой отсутствует файл или нет прав на его открытие
        output = BytesIO()
        fd_img = open(image_path, 'rb')
        img = Image.open(fd_img)
        img = resizeimage.resize_height(img, 100, validate=False)
        img.save(output, img.format)
        fd_img.close()
        mimetype = mimetypes.guess_type(image_name)[0]
        # TODO: Изучить, чем отличается FileResponse от HttpResponse при передачи файлов
        response = HttpResponse(output.getvalue(), content_type=mimetype)
        response['Content-Disposition'] = 'attachment; filename=myfile.jpg'
        return response
    
    return JsonResponse({'error': target})

def images(request):
    # TODO: Переделать эту функцию
    search = request.GET.get('search', None)
    base_id = request.GET.get('album', None)
    limit = int(request.GET.get('limit', '10'))
    offset = int(request.GET.get('offset', '0'))

    if (base_id is None):
        # TODO: Вернуть нормальную ошибку
        return JsonResponse({'result1': []})

    dir_path = os.path.join(IMAGES_SOURCE, base_id)

    image_seq = seq(os.listdir(dir_path))#\
        # .filter(lambda filename: os.path.isfile(os.path.join(dir, filename)))\

    if search is not None:
        regexp = re.compile(search, re.IGNORECASE)
        image_seq = image_seq.filter(lambda filename: regexp.match(filename) is not None)

    total = image_seq.count(lambda filename: True) 

    result = image_seq\
        .sorted()\
        .drop(offset)\
        .take(limit)\
        .map(lambda filename: {\
            'id': base64.b64encode(bytes(base_id + '/' + filename, 'utf-8')).decode('utf-8'),\
            'title': filename,\
        })\
        .to_list()

    # image_text = base64.b64encode(byte_content).decode('utf-8')
    return JsonResponse({ 'total': total, 'result': result })


# def getSmallBase64Image(file_name):
#     print(file_name)
#     output = BytesIO()
#     fd_img = open(file_name, 'rb')
#     img = Image.open(fd_img)
#     img = resizeimage.resize_height(img, 100, validate=False)
#     img.save(output, img.format)
#     fd_img.close()
#     # output.close()
#     # return output.getvalue().encode('base64')
#     # return file_name
#     return base64.b64encode(output.getvalue()).decode('utf-8')


    # output = StringIO()
    # with open(file_name, 'r+b') as file:
    #     with Image.open(file) as image:
    #         cover = resizeimage.resize_height(image, 100)
    #         cover.save(output, image.format)
    # return output.getvalue().encode('base64')

# from base64 import b64encode
# from json import dumps

# ENCODING = 'utf-8'
# IMAGE_NAME = 'spam.jpg'
# JSON_NAME = 'output.json'

# # first: reading the binary stuff
# # note the 'rb' flag
# # result: bytes
# with open(IMAGE_NAME, 'rb') as open_file:
#     byte_content = open_file.read()

# # second: base64 encode read data
# # result: bytes (again)
# base64_bytes = b64encode(byte_content)

# # third: decode these bytes to text
# # result: string (in utf-8)
# base64_string = base64_bytes.decode(ENCODING)

# # optional: doing stuff with the data
# # result here: some dict
# raw_data = {IMAGE_NAME: base64_string}

# # now: encoding the data to json
# # result: string
# json_data = dumps(raw_data, indent=2)

# # finally: writing the json string to disk
# # note the 'w' flag, no 'b' needed as we deal with text here
# with open(JSON_NAME, 'w') as another_open_file:
#     another_open_file.write(json_data)