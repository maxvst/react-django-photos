import os
import base64
from functional import seq
from PIL import Image
from resizeimage import resizeimage
from io import BytesIO

from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

from photos.settings import IMAGES_SOURCE


def index(request):
    return HttpResponse("Hello, world. You're at index.")

def base(request, id):
    limit = int(request.GET.get('limit', '10'))
    offset = int(request.GET.get('offset', '0'))
    dir = os.path.join(IMAGES_SOURCE, id)

    images = seq(os.listdir(dir))\
        .filter(lambda file: os.path.isfile(os.path.join(dir, file)))\
        .sorted()
    
    total = images.count(lambda x: True)
    
    result = images\
        .drop(offset)\
        .take(limit)\
        .map(lambda x: {\
            'id': base64.b64encode(bytes(id + '/' + x, 'utf-8')).decode('utf-8'),\
            'title': x,\
            'image': getSmallBase64Image(os.path.join(dir, x))
        })\
        .to_list()
        
    return JsonResponse({'total': total, 'result': result})

def bases(request):
    limit = int(request.GET.get('limit', '10'))
    offset = int(request.GET.get('offset', '0'))

    files = os.listdir(IMAGES_SOURCE)
    bases = list(filter(lambda file: os.path.isdir(os.path.join(IMAGES_SOURCE, file)), files))
    bases.sort()

    bases = seq(os.listdir(IMAGES_SOURCE))\
        .filter(lambda file: os.path.isdir(os.path.join(IMAGES_SOURCE, file)))\
        .sorted()

    total = bases.count(lambda x: True)

    result = bases\
        .drop(offset)\
        .take(limit)\
        .map(lambda x: {'id': x, 'title': x})\
        .to_list()
    
    return JsonResponse({'total': total, 'result': result})

def image(request, id):
    [dir_name, image_name] = base64.b64decode(id).decode('utf-8').split('/')
    image_path = os.path.join(IMAGES_SOURCE, dir_name, image_name)

    with open(image_path, 'rb') as open_file:
        byte_content = open_file.read()
    
    image_text = base64.b64encode(byte_content).decode('utf-8')
    return JsonResponse({'id': id, 'base': dir_name, 'title': image_name, 'image': image_text})

def getSmallBase64Image(file_name):
    print(file_name)
    output = BytesIO()
    fd_img = open(file_name, 'rb')
    img = Image.open(fd_img)
    img = resizeimage.resize_height(img, 100, validate=False)
    img.save(output, img.format)
    fd_img.close()
    # output.close()
    # return output.getvalue().encode('base64')
    # return file_name
    return base64.b64encode(output.getvalue()).decode('utf-8')


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