from django.shortcuts import render


def home_view(request, *args, **kwargs):
	context = {
		"title": "home",
	}

	return render(request, "home.html", context)


def about_view(request, *args, **kwargs):
	context = {
		"title": "about",
	}

	return render(request, "about.html", context)


def contact_view(request, *args, **kwargs):
	context = {
		"title": "contact",
		"contacts": [
			"contact1",
			"contact2",
			"contact3",
			"contact4",
			"contact5",
		],
	}

	return render(request, "contact.html", context)
