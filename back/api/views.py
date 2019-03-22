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
from django.http import JsonResponse, HttpResponse, FileResponse, HttpResponseNotFound

from photos.settings import IMAGES_SOURCE

# TODO: подумать, куда лучше вынести дефолтный размер картинки предварительного просмотра
size = 200, 200

# TODO: Вынести цвет фона в отдельный модуль.
background_color = 128, 128, 128

def make_preview_image (img, size):
    width, height = img.size
    # # обрзаем картинку до квадратной с сохранением центрирования
    square_size = min(height, width)
    left = (width - square_size)/2
    top = (height - square_size)/2
    right = (width + square_size)/2
    bottom = (height + square_size)/2
    img = img.crop((left, top, right, bottom))
    img = img.resize(size, Image.ANTIALIAS)
    return img

def index(request):
    return HttpResponse("Hello, world. You're at index.")

def base_info(request, id):
    dir = os.path.join(IMAGES_SOURCE, id)

    total_images = seq(os.listdir(dir))\
        .filter(lambda filename: os.path.isfile(os.path.join(dir, filename)))\
        .count(lambda filename: True)
        
    return JsonResponse({ 'id': id, 'name': 'id',  'total_images': total_images })

def base_preview(request, id):
    dir = os.path.join(IMAGES_SOURCE, id)
    dir_path = os.path.join(IMAGES_SOURCE, dir)

    image_seq = seq(os.listdir(dir_path))\
        .filter(lambda filename: os.path.isfile(os.path.join(dir, filename)))\
        .take(4)\
        .to_list()

    # TODO: Проверить необходимость объявления переменной за перделами нижеследующего if
    img = None
    preview_size = list(map(lambda x: int(x/2), size))

    result_img = Image.new('RGB', size, color = background_color)
    # TODO: Завернуть нижеследующие условия в цикл
    if len(image_seq) > 0:
        img = Image.open(os.path.join(dir_path, image_seq[0]))
        img = make_preview_image(img, preview_size)
        result_img.paste(img, (0, 0))
    if len(image_seq) > 1:
        img = Image.open(os.path.join(dir_path, image_seq[1]))
        img = make_preview_image(img, preview_size)
        result_img.paste(img, (int(size[0]/2), 0))
    if len(image_seq) > 2:
        img = Image.open(os.path.join(dir_path, image_seq[2]))
        img = make_preview_image(img, preview_size)
        result_img.paste(img, (0, int(size[1]/2)))
    if len(image_seq) > 3:
        img = Image.open(os.path.join(dir_path, image_seq[3]))
        img = make_preview_image(img, preview_size)
        result_img.paste(img, (int(size[0]/2), int(size[1]/2)))

    output = BytesIO()
    result_img.save(output, "JPEG")
    response = HttpResponse(output.getvalue(), content_type='image/jpeg')
    response['Content-Disposition'] = 'attachment; filename=myfile.jpg'
    return response

def bases(request):
    search = request.GET.get('filter', None)
    limit = int(request.GET.get('limit', '10'))
    offset = int(request.GET.get('offset', '0'))

    base_seq = seq(os.listdir(IMAGES_SOURCE))\
        .filter(lambda filename: os.path.isdir(os.path.join(IMAGES_SOURCE, filename)))

    if search is not None:
        regexp = re.compile(search, re.IGNORECASE)
        # base_seq = base_seq.filter(lambda filename: regexp.match(filename) is not None)
        base_seq = base_seq.filter(lambda filename: search in filename)

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

    # # TODO: обработать ситуацию, при которой отсутствует файл или нет прав на его открытие
    output = BytesIO()

    with Image.open(image_path) as img:
        # TODO: Вынести size в отдельный модуль.
        
        img = make_preview_image(img, size)
        img.save(output, "JPEG")

        response = HttpResponse(output.getvalue(), content_type='image/jpeg')
        response['Content-Disposition'] = 'attachment; filename=myfile.jpg'
        return response

    return HttpResponseNotFound('<h1>No Page Here</h1>')

def images(request):
    # TODO: Переделать эту функцию
    search = request.GET.get('filter', None)
    base_id = request.GET.get('album', None)
    limit = int(request.GET.get('limit', '10'))
    offset = int(request.GET.get('offset', '0'))

    if (base_id is None):
        # TODO: Вернуть нормальную ошибку
        return JsonResponse({'result1': []})

    dir_path = os.path.join(IMAGES_SOURCE, base_id)

    image_seq = seq(os.listdir(dir_path))\
        .filter(lambda filename: os.path.isfile(os.path.join(dir_path, filename)))#\

    if search is not None:
        # regexp = re.compile(search, re.IGNORECASE)
        image_seq = image_seq.filter(lambda filename: search in filename)

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
