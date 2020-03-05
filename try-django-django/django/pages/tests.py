import re

from django.test import TestCase
from django.urls import reverse

from .forms import ProductForm, RawProductForm
from .models import Product


def create_product(title="", description="", price=0, summary="", featured=True):
	return Product.objects.create(title=title, description=description, price=price, summary=summary, featured=featured)


class ProductsDetailViewTests(TestCase):
	def test_detail_page(self):
		item = create_product(title="item 01", price=1.01, summary="Item 01", description="Description 01")
		response = self.client.get(reverse("products:detail", kwargs={"identifier": item.id}))
		content = response.content.decode("utf-8")
		self.assertEqual(response.status_code, 200)
		self.assertTemplateUsed(response, "products/product_detail.html")
		self.assertTrue(re.search(r"<p>[\s\n]+Description:[\s\n]+<br>[\s\n]+Description 01[\s\n]+</p>", content))


class ProductsCreateViewTests(TestCase):
	def test_valid_create_page(self):
		item = create_product(title="item 01", description="", price=1.01, summary="Item 01", featured=True)
		data = {
			"title": item.title,
			"description": item.description,
			"price": item.price,
			"summary": item.summary,
			"featured": item.featured,
		}
		form = ProductForm(data=data)
		response = self.client.get(reverse("products:create"))
		self.assertEqual(response.status_code, 200)
		self.assertTemplateUsed(response, "products/product_create.html")
		self.assertTrue(form.is_valid())
		response = self.client.post(reverse("products:create"), data)
		self.assertRedirects(response, reverse("products:list"))

	def test_invalid_create_page(self):
		item = create_product(title="01", description="", price=1.01, summary="Item 01", featured=True)
		data = {
			"title": item.title,
			"description": item.description,
			"price": item.price,
			"summary": item.summary,
			"featured": item.featured,
		}
		form = ProductForm(data=data)
		response = self.client.get(reverse("products:create"))
		self.assertEqual(response.status_code, 200)
		self.assertTemplateUsed(response, "products/product_create.html")
		self.assertFalse(form.is_valid())


class ProductsUpdateViewTests(TestCase):
	def test_valid_update_page(self):
		item = create_product(title="item 01", description="", price=1.01, summary="Item 01", featured=True)
		data = {
			"title": item.title,
			"description": item.description,
			"price": item.price,
			"summary": item.summary,
			"featured": item.featured,
		}
		form = ProductForm(data=data)
		response = self.client.get(reverse("products:update", kwargs={"identifier": item.id}))
		self.assertEqual(response.status_code, 200)
		self.assertTemplateUsed(response, "products/product_update.html")
		self.assertTrue(form.is_valid())
		response = self.client.post(reverse("products:update", kwargs={"identifier": item.id}), data)
		self.assertRedirects(response, reverse("products:detail", kwargs={"identifier": item.id}))

	def test_invalid_update_page(self):
		item = create_product(title="01", description="", price=1.01, summary="Item 01", featured=True)
		data = {
			"title": item.title,
			"description": item.description,
			"price": item.price,
			"summary": item.summary,
			"featured": item.featured,
		}
		form = ProductForm(data=data)
		response = self.client.get(reverse("products:update", kwargs={"identifier": item.id}))
		self.assertEqual(response.status_code, 200)
		self.assertTemplateUsed(response, "products/product_update.html")
		self.assertFalse(form.is_valid())

	def test_list_page_no_products(self):
		response = self.client.get(reverse("products:list"))
		self.assertEqual(response.status_code, 200)
		self.assertTemplateUsed(response, "products/product_list.html")
		self.assertContains(response, '<a href="/products/create/">New product</a>')
		self.assertContains(response, "No products added yet")


class ProductsDeleteViewTests(TestCase):
	def test_delete_page(self):
		create_product(title="item 02", description="", price=2.02, summary="Item 02", featured=True)
		item = create_product(title="item 01", description="", price=1.01, summary="Item 01", featured=True)
		data = {
			"title": item.title,
			"description": item.description,
			"price": item.price,
			"summary": item.summary,
			"featured": item.featured,
		}
		response = self.client.get(reverse("products:delete", kwargs={"identifier": item.id}))
		self.assertEqual(response.status_code, 200)
		self.assertTemplateUsed(response, "products/product_delete.html")
		response = self.client.post(reverse("products:delete", kwargs={"identifier": item.id}), data)
		self.assertRedirects(response, reverse("products:list"))
		response = self.client.get(reverse("products:list"))
		print(response.context["object_list"])
		self.assertQuerysetEqual(response.context["object_list"], ["<Product: Product object (1)>"])


class ProductsListViewTests(TestCase):
	def test_list_page_no_products(self):
		response = self.client.get(reverse("products:list"))
		self.assertEqual(response.status_code, 200)
		self.assertTemplateUsed(response, "products/product_list.html")
		self.assertContains(response, '<a href="/products/create/">New product</a>')
		self.assertContains(response, "No products added yet")

	def test_list_page_with_products(self):
		create_product(title="item 01", price=1.01, summary="Item 01")
		response = self.client.get(reverse("products:list"))
		content = response.content.decode("utf-8")
		self.assertEqual(response.status_code, 200)
		self.assertTemplateUsed(response, "products/product_list.html")
		self.assertTrue(re.search(r'<a href="/products/detail/\d+/">[\s\n]+Name: Item \w+[\s\n]+</a>', content))
		self.assertTrue(re.search(r"<p>[\s\n]+Price: \$1.01[\s\n]+</p>", content))
