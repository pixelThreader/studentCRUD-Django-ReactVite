from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from .models import Student
from .serializers import StudentSerializer
from rest_framework.pagination import PageNumberPagination


@api_view(['POST'])
def getDBDetails(request):
    what = request.POST.get('authorized-token-no')
    return Response({
        'key': what,
        'status': 'Success',
        'status_code': status.HTTP_200_OK
    }, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
def getStudent(request):
    if request.method == 'GET':
        queryset = Student.objects.all().order_by('sno')  # Ensure the queryset is ordered
        paginator = PageNumberPagination()
        paginator.page_size = 50  # Set page size
        result_page = paginator.paginate_queryset(queryset, request)
        serializer = StudentSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    
    elif request.method == 'POST':
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def addStudent(request):
    if request.method == 'POST':
        student_data = JSONParser().parse(request)
        student_serializer = StudentSerializer(data=student_data)
        if student_serializer.is_valid():
            student_serializer.save()
            return JsonResponse({
                'student_status': student_serializer.data,
                'status': 'Success',
                'status_code': 200
            }, status=status.HTTP_200_OK)
        else:
            return JsonResponse({
                'student_status': student_serializer.errors,
                'status': 'Bad Request',
                'status_code': 400
            }, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST', 'GET'])
def giveMeMyProfile(request, username):
    try:
        student = Student.objects.get(username=username)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = StudentSerializer(student)
        return Response(serializer.data)
    
    elif request.method in ['PUT', 'PATCH']:
        serializer = StudentSerializer(student, data=request.data, partial=request.method == 'PATCH')
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['POST', 'GET', 'DELETE'])
def deleteMyProfile(request):
    if request.method == 'POST':
        stuaddno = request.POST.get('')
        stuname = request.POST.get('')
        stuclass_name = request.POST.get('')
        sturoll_no = request.POST.get('')
        studentDetail = Student.objects.filter(class_name = stuclass_name)
        studentDetail = studentDetail.filter(name=stuname).filter(roll_no=sturoll_no)
        target_student = studentDetail.get(admission_no=stuaddno)

        if target_student is not None:
            target_student.delete()
            stu_tgt = StudentSerializer(target_student, many=True)
            return JsonResponse({
                'student_status': stu_tgt.data,
                'status': 'Success',
                'status_code': 200
            }, safe=False)
        else:
            return JsonResponse({
                'student_status': 'No student found in the DataBase',
                'status': 'Bad Request',
                'status_code': 400
            })

@api_view(['POST', 'GET', 'PUTS'])
def editMyProfile(request):
    if request.method == 'POST':
        stuaddno = request.POST.get('')
        stuname = request.POST.get('')
        stuclass_name = request.POST.get('')
        sturoll_no = request.POST.get('')
        studentDetail = Student.objects.filter(class_name = stuclass_name)
        studentDetail = studentDetail.filter(name=stuname).filter(roll_no=sturoll_no)
        target_student = studentDetail.get(admission_no=stuaddno)

        if target_student is not None:
            target_student.delete()
            stu_tgt = StudentSerializer(target_student, many=True)
            return JsonResponse({
                'student_status': stu_tgt.data,
                'status': 'Success',
                'status_code': 200
            }, safe=False)
        else:
            return JsonResponse({
                'student_status': 'No student found in the DataBase',
                'status': 'Bad Request',
                'status_code': 400
            })