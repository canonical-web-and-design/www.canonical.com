"""
Django views for www.canonical.com.
"""

from django_template_finder_view import TemplateFinder


class CanonicalTemplateFinder(TemplateFinder):
    """
    Local customisations of the shared django_template_finder_view.
    """

    def get_context_data(self, **kwargs):
        """
        Get context data fromt the database for the given page.
        """

        # Get any existing context
        context = super(CanonicalTemplateFinder, self).get_context_data(
            **kwargs
        )

        # Add job role
        context['job_id'] = self.request.GET.get('job_id')

        # Add level_* context variables
        clean_path = self.request.path.strip('/')
        for index, path, in enumerate(clean_path.split('/')):
            context["level_" + str(index + 1)] = path

        return context
