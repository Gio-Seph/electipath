"""
Custom exception handler for Django REST Framework
Ensures all errors return JSON instead of HTML
Updated: 2025-12-09
"""
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger(__name__)


def custom_exception_handler(exc, context):
    """
    Custom exception handler that always returns JSON responses
    """
    # Call REST framework's default exception handler first
    response = exception_handler(exc, context)
    
    # If DRF's handler didn't catch it, create our own JSON response
    if response is None:
        import traceback
        error_trace = traceback.format_exc()
        
        logger.error(f"Unhandled exception: {str(exc)}")
        logger.error(f"Traceback: {error_trace}")
        
        response = Response(
            {
                "detail": f"An error occurred: {str(exc)}",
                "error_type": type(exc).__name__,
                "traceback": error_trace
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    else:
        # Even if DRF caught it, ensure it's JSON
        logger.error(f"DRF handled exception: {str(exc)}")
    
    return response
