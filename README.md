```shell
virturalenv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py runserver
```
  

To register the changes to any of the database models run
```shell
python manage.py makemigrations
```

To apply these changes to the database run
```shell
python manage.py migrate
```