# Settings specified here will take precedence over those in config/environment.rb

# In the development environment your application's code is reloaded on
# every request.  This slows down response time but is perfect for development
# since you don't have to restart the webserver when you make code changes.
# config.cache_classes = false
config.cache_classes = false

# Log error messages when you accidentally call methods on nil.
config.whiny_nils = true

# Show full error reports and disable caching
#config.action_controller.consider_all_requests_local = true
#config.action_view.debug_rjs                         = true
#config.action_controller.perform_caching             = false

config.action_controller.consider_all_requests_local  = true
config.action_controller.perform_caching              = false
config.action_view.cache_template_loading             = false
config.action_view.debug_rjs			                    = true

#config.cache_store = [:file_store, "/var/www/thoughtdomains.org/tmp/cache"]

# Don't care if the mailer can't send
config.action_mailer.raise_delivery_errors = false

#config.threadsafe!

config.after_initialize do
  ActiveMerchant::Billing::Base.mode = :test
  paypal_options = {
    :login => "sp_1326772914_biz_api1.mofaq.com",
    :password => "1326772936",
    :signature => "AM9dWbGZVPYN0-6B38JEaI9XyINnATHqNjNRRVVn1k6UWV7CSM2EzYz9"
  }
  ::STANDARD_GATEWAY = ActiveMerchant::Billing::PaypalGateway.new(paypal_options)
  ::EXPRESS_GATEWAY = ActiveMerchant::Billing::PaypalExpressGateway.new(paypal_options)
end
