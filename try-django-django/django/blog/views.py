from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse

from .forms import ArticleForm
from .models import Article


def list_view(request, *args, **kwargs):
	context = {
		"title": "articles",
		"object_list": Article.objects.all(),
	}

	return render(request, "blog/article_list.html", context)


def detail_view(request, identifier, *args, **kwargs):
	context = {
		"article": get_object_or_404(Article, id=identifier),
	}

	return render(request, "blog/article_detail.html", context)


def create_view(request, *args, **kwargs):
	initial = {
		"title": "article ",
		"author": "author ",
		"content": "Article ",
		"summary": "Article ",
	}

	context = {"title": "new article", "form": ArticleForm(request.POST or None, initial=initial)}

	if context["form"].is_valid():
		context["form"].save()
		return redirect(reverse("blog:list"))

	return render(request, "blog/article_create.html", context)


def update_view(request, identifier, *args, **kwargs):
	instance = get_object_or_404(Article, id=identifier)

	context = {
		"article": instance,
		"form": ArticleForm(request.POST or None, instance=instance),
	}

	if request.method == "POST" and context["form"].is_valid():
		context["form"].save()
		return redirect(reverse("blog:detail", kwargs={"identifier": instance.id}))

	return render(request, "blog/article_update.html", context)


def delete_view(request, identifier, *args, **kwargs):
	context = {
		"article": get_object_or_404(Article, id=identifier),
	}

	if request.method == "POST":
		context["article"].delete()
		return redirect(reverse("blog:list"))

	return render(request, "blog/article_delete.html", context)
