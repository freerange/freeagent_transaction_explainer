require 'minitest/autorun'
require 'webrick'

require 'bundler/setup'

require 'capybara'
require 'capybara/poltergeist'

class IntegrationTest < MiniTest::Unit::TestCase
  include Capybara::DSL

  def setup
    Capybara.save_and_open_page_path = File.expand_path('../../../tmp/capybara/', __FILE__)
    Capybara.current_driver = :poltergeist
    Capybara.app = Rack::Directory.new(File.expand_path('../fixtures/', __FILE__))
    @server = Capybara::Server.new(Capybara.app).boot
  end

  def teardown
    @server = nil
  end

  def test_should_explain_transaction
    visit "http://#{@server.host}:#{@server.port}/freeagent-unexplained-transaction.html"
    page.execute_script("window.rulesUrl = 'http://#{@server.host}:#{@server.port}/test-rules.json'")
    page.execute_script(File.read(File.expand_path('../../../lib/freeagent-transaction-helper.js', __FILE__)))

    assert page.has_select?('purchase_sales_tax_rate', selected: '0')
    assert page.has_select?('spending_category', selected: 'Sundries')
    assert page.has_field?('description', with: 'Pact Coffee London')
    assert page.has_checked_field?('Non-EC')
    assert page.has_text?('Now upload an attachment!')
  end

  def test_should_inform_user_that_a_matching_rule_cannot_be_found
    visit "http://#{@server.host}:#{@server.port}/freeagent-unexplained-transaction.html"
    page.execute_script("window.rulesUrl = 'http://#{@server.host}:#{@server.port}/empty-test-rules.json'")
    page.execute_script(File.read(File.expand_path('../../../lib/freeagent-transaction-helper.js', __FILE__)))

    assert page.has_text?('No matching rules found')
  end
end
