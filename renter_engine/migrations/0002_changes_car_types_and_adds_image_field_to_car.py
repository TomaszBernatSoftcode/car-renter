# Generated by Django 2.2.7 on 2020-01-02 21:41

from django.db import migrations, models
import renter_engine.models


class Migration(migrations.Migration):

    dependencies = [
        ('renter_engine', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='car',
            name='type',
            field=models.CharField(choices=[('sedan', 'Sedan'), ('hatchback', 'Hatchback'), ('suv', 'Suv'), ('kombi', 'Kombi'), ('smart', 'Smart')], max_length=9, verbose_name='Typ'),
        ),
        migrations.AlterField(
            model_name='cardetails',
            name='image',
            field=models.ImageField(blank=True, max_length=2000, upload_to=renter_engine.models.car_directory_path),
        ),
    ]