from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Student(models.Model):

    user = models
    sno = models.AutoField(primary_key=True, db_index=True)
    admission_no = models.CharField(max_length=100, default="undefined", unique=True, null=True, db_index=True)
    name = models.CharField(max_length=100, default="undefined", null=True)
    age = models.IntegerField(default=5, null=True)
    profile_img = models.ImageField(upload_to="static/images", default="static/images/default.png", null=True)
    class_name = models.CharField(max_length=100, default="undefined", null=True)
    address = models.CharField(max_length=1000, default="undefined", null=True)
    roll_no = models.CharField(max_length=100, default="undefined", null=True)
    date_of_addmission = models.DateField(auto_now_add=True, null=True)
    dob = models.DateField(auto_now_add=True, null=True)
    about = models.TextField(default="A student of XYZ school.", null=True)
    fathers_name = models.CharField(max_length=500, default="undefined", null=True, db_index=True)
    mothers_name = models.CharField(max_length=500, default="undefined", null=True, db_index=True)
    phone_num = models.CharField(max_length=20, default="xxxxxxxxxx", null=True)
    phone_num_alt = models.CharField(max_length=20, default="xxxxxxxxxx", null=True)
    phone_gardian = models.CharField(max_length=20, default="xxxxxxxxxx", null=True)
    isactive = models.BooleanField(default=True, null=True)

    class Meta:
        verbose_name = ("Student")
        verbose_name_plural = ("Students")

    def __str__(self):
        return self.name
