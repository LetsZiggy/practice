from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse, reverse_lazy
from django.views.generic import (
	CreateView,
	DeleteView,
	DetailView,
	ListView,
	UpdateView,
)

from .forms import ArticleForm
from .models import Article

# def list_view(request, *args, **kwargs):
# 	context = {
# 		"title": "articles",
# 		"object_list": Article.objects.all(),
# 	}

# 	return render(request, "blog/article_list.html", context)

# def detail_view(request, identifier, *args, **kwargs):
# 	context = {
# 		"article": get_object_or_404(Article, id=identifier),
# 	}

# 	return render(request, "blog/article_detail.html", context)

# def create_view(request, *args, **kwargs):
# 	initial = {
# 		"title": "article ",
# 		"author": "author ",
# 		"content": "Article ",
# 		"summary": "Article ",
# 	}

# 	context = {"title": "new article", "form": ArticleForm(request.POST or None, initial=initial)}

# 	if context["form"].is_valid():
# 		context["form"].save()
# 		return redirect(reverse("blog:list"))

# 	return render(request, "blog/article_create.html", context)

# def update_view(request, identifier, *args, **kwargs):
# 	instance = get_object_or_404(Article, id=identifier)

# 	context = {
# 		"article": instance,
# 		"form": ArticleForm(request.POST or None, instance=instance),
# 	}

# 	if request.method == "POST" and context["form"].is_valid():
# 		context["form"].save()
# 		return redirect(reverse("blog:detail", kwargs={"identifier": instance.id}))

# 	return render(request, "blog/article_update.html", context)

# def delete_view(request, identifier, *args, **kwargs):
# 	context = {
# 		"article": get_object_or_404(Article, id=identifier),
# 	}

# 	if request.method == "POST":
# 		context["article"].delete()
# 		return redirect(reverse("blog:list"))

# 	return render(request, "blog/article_delete.html", context)


class ArticleListView(ListView):
	# Defaults to "<app_name>/<model_name>_<view_type>.html"
	# template_name = "blog/article_list.html"

	# queryset = Article.objects.all()

	# Setting "model" is the same as queryset=<model_name>.objects.all()
	model = Article

	# Overwrite context key for queryset
	# Default key is "object_list"
	# context_object_name = "object_list"

	def get_context_data(self, **kwargs):
		# Call the base implementation first to get a context
		context = super().get_context_data(**kwargs)

		# Add additional context
		context["title"] = "articles"

		return context


class ArticleDetailView(DetailView):
	# Defaults to "<app_name>/<model_name>_<view_type>.html"
	# template_name = "blog/article_detail.html"

	# queryset = Article.objects.get(id=pk)

	# Setting "model" is the same as queryset=<model_name>.objects.all()
	model = Article

	# Overwrite context key for queryset
	# Default key is "object"
	context_object_name = "article"

	# Defaults to "pk" as <url_data_variable>
	# "get_object" is similar to "queryset"
	# Used for single object CBVs
	def get_object(self):
		identifier = self.kwargs.get("identifier")
		return get_object_or_404(Article, id=identifier)


class ArticleCreateView(CreateView):
	# Defaults to "<app_name>/<model_name>_form.html"
	# template_name = "blog/article_create.html"

	# Can use instead of "template_name"
	# Requires "model" to be defined
	# Add suffix to default template "<app_name>/<model_name><suffix_added_here>.html"
	template_name_suffix = "_create"

	# queryset = Article.objects.all()

	# Setting "model" is the same as queryset=<model_name>.objects.all()
	model = Article

	form_class = ArticleForm

	# Defaults based on "model.get_absolute_url()" (See view model)
	# Requires use of "reverse_lazy" instead of "reverse"
	success_url = reverse_lazy("blog:list")

	def get_initial(self):
		return {
			"title": "article ",
			"author": "author ",
			"content": "Article ",
			"summary": "Article ",
		}

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		context["title"] = "new article"
		return context

	def form_valid(self, form):
		# This method is called when valid form data has been POSTed
		# It should return an HttpResponse
		# Additional actions can be done here to validated data

		return super().form_valid(form)


class ArticleUpdateView(UpdateView):
	# Defaults to "<app_name>/<model_name>_form.html"
	# template_name = "blog/article_update.html"

	# Can use instead of "template_name"
	# Requires "model" to be defined
	# Add suffix to default template "<app_name>/<model_name><suffix_added_here>.html"
	template_name_suffix = "_update"

	# queryset = Article.objects.get(id=pk)

	# Setting "model" is the same as queryset=<model_name>.objects.all()
	model = Article

	form_class = ArticleForm

	# Defaults based on "model.get_absolute_url()" (See view model)
	# Requires use of "reverse_lazy" instead of "reverse"
	# success_url = reverse_lazy("blog:list")

	# Defaults to "pk" as <url_data_variable>
	# "get_object" is similar to "queryset"
	# Used for single object CBVs
	def get_object(self):
		identifier = self.kwargs.get("identifier")
		return get_object_or_404(Article, id=identifier)


class ArticleDeleteView(DeleteView):
	# Defaults to "<app_name>/<model_name>_confirm_delete.html"
	# template_name = "blog/article_delete.html"

	# Can use instead of "template_name"
	# Requires "model" to be defined
	# Add suffix to default template "<app_name>/<model_name><suffix_added_here>.html"
	template_name_suffix = "_delete"

	# queryset = Article.objects.get(id=pk)

	# Setting "model" is the same as queryset=<model_name>.objects.all()
	model = Article

	# Defaults based on "model.get_absolute_url()" (See view model)
	# Requires use of "reverse_lazy" instead of "reverse"
	success_url = reverse_lazy("blog:list")

	# Overwrite context key for queryset
	# Default key is "object"
	context_object_name = "article"

	# Defaults to "pk" as <url_data_variable>
	# "get_object" is similar to "queryset"
	# Used for single object CBVs
	def get_object(self):
		identifier = self.kwargs.get("identifier")
		return get_object_or_404(Article, id=identifier)
