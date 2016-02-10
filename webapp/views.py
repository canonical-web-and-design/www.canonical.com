from django_template_finder_view import TemplateFinder
from django.http import HttpResponseNotFound, HttpResponseServerError, HttpResponse
from django.template import RequestContext, loader, Context

class CanonicalTemplateFinder(TemplateFinder):
    def get_context_data(self, **kwargs):
        """
        Get context data fromt the database for the given page
        """

        # Get any existing context
        context = super(CanonicalTemplateFinder, self).get_context_data(**kwargs)

        # Add level_* context variables
        clean_path = self.request.path.strip('/')
        for index, path, in enumerate(clean_path.split('/')):
            context["level_" + str(index + 1)] = path

        return context
