from django.http import Http404
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse

from .forms import ProductForm, RawProductForm
from .models import Product


def detail_view(request, identifier, *args, **kwargs):
	# try:
	# 	product = Product.objects.get(id=identifier)
	# except Product.DoesNotExist:
	# 	raise Http404

	context = {
		# "product": Product.objects.get(id=identifier),
		# "product": product,
		"product": get_object_or_404(Product, id=identifier),
	}

	return render(request, "products/product_detail.html", context)


# def create_view(request, *args, **kwargs):
# 	context = {
# 		"title": "new product",
# 		"form": RawProductForm(request.POST or None),
# 	}

# 	if context["form"].is_valid():
# 		print(context["form"].cleaned_data)

# 		Product.objects.create(**context["form"].cleaned_data)
# 		# context["form"] = RawProductForm(None)
# 		return redirect(reverse("products:list"))
# 	else:
# 		print(context["form"].errors)

# 	return render(request, "products/product_create.html", context)


def create_view(request, *args, **kwargs):
	# if request.method == "GET":
	# 	print(request.GET)
	# elif request.method == "POST":
	# 	print(request.POST)

	# instance = Product.objects.get(id=1)

	initial = {
		"title": "item ",
		"summary": "Item ",
	}

	context = {
		"title": "new product",
		# "form": ProductForm(request.POST or None, instance=instance),
		"form": ProductForm(request.POST or None, initial=initial),
	}

	if context["form"].is_valid():
		context["form"].save()
		# context["form"] = ProductForm(None)
		return redirect(reverse("products:list"))

	return render(request, "products/product_create.html", context)


def update_view(request, identifier, *args, **kwargs):
	instance = get_object_or_404(Product, id=identifier)

	context = {
		"product": instance,
		"form": ProductForm(request.POST or None, instance=instance),
	}

	if request.method == "POST" and context["form"].is_valid():
		context["form"].save()
		# context["form"] = ProductForm(None)
		return redirect(reverse("products:detail", kwargs={"identifier": instance.id}))

	return render(request, "products/product_update.html", context)


def delete_view(request, identifier, *args, **kwargs):
	context = {
		"product": get_object_or_404(Product, id=identifier),
	}

	if request.method == "POST":
		context["product"].delete()
		return redirect(reverse("products:list"))

	return render(request, "products/product_delete.html", context)


def list_view(request, *args, **kwargs):
	context = {
		"title": "products",
		"object_list": Product.objects.all(),
	}

	return render(request, "products/product_list.html", context)
