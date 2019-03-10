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
    dir = os.path.join(IMAGES_SOURCE, id)

    total_images = seq(os.listdir(dir))\
        .filter(lambda filename: os.path.isfile(os.path.join(dir, filename)))\
        .count(lambda filename: True)
        
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

def image_native(request, id):
    [dir_name, image_name] = base64.b64decode(id).decode('utf-8').split('/')
    image_path = os.path.join(IMAGES_SOURCE, dir_name, image_name)

    # TODO: обработать ситуацию, при которой отсутствует файл или нет прав на его открытие
    # TODO: проверить, что передаются все необходимые заголовки
    # TODO: проверить, что закрывается файловый десткриптор
    return FileResponse(open(image_path, 'rb'))

def image_info(request, id):
    [dir_name, image_name] = base64.b64decode(id).decode('utf-8').split('/')
    image_path = os.path.join(IMAGES_SOURCE, dir_name, image_name)

    if os.path.isfile(image_path):
        return JsonResponse({'id': id, 'album_id': dir_name, 'album_name': dir_name, 'title': image_name })
    return JsonResponse({'error': 'NOT FOUND', 'description': 'Изображение не найдено.'}, status=404)

def image_preview(request, id):
    [dir_name, image_name] = base64.b64decode(id).decode('utf-8').split('/')
    image_path = os.path.join(IMAGES_SOURCE, dir_name, image_name)

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
