# Poll Application

#### Guides

[Written Guide](https://docs.djangoproject.com/en/1.11/intro/tutorial01/)

---

#### Setup

- Setup Django
	1. `cd <ROOT_FOLDER>`
	2. `mkdir django`
	3. `cd <ROOT_FOLDER>/django`
	4. `python -m venv venv`
	5. `source venv/bin/activate`
	6. `pip install -r requirements.txt`
	7. Install poll app
		1. `cd <ROOT_FOLDER>`
		2. `mkdir django-polls`
		3. `cd <ROOT_FOLDER>/django-polls`
		4. `python setup.py sdist`
		5. `pip install ../django-polls/dist/django-polls-0.1.tar.gz`
	8. `cd <ROOT_FOLDER>/django`
	9. Create and edit `.env`
		- Use `.env.example` as example
	10. `python manage.py makemigrations`
	11. `python manage.py migrate`
	12. `python manage.py createsuperuser`

---

#### Run

- Django
	1. `cd <ROOT_FOLDER>/django`
	2. `source venv/bin/activate`
	3. `python manage.py runserver`

---

#### Testing

- Django
	1. `cd <ROOT_FOLDER>/django`
	2. `source venv/bin/activate`
	3. `python manage.py test`
