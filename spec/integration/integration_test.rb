require 'minitest/autorun'
require 'webrick'

require 'bundler/setup'

require 'capybara'
require 'capybara/poltergeist'

class IntegrationTest < MiniTest::Unit::TestCase
  include Capybara::DSL

  def setup
    Capybara.current_driver = :poltergeist
    root = File.expand_path('../fixtures/', __FILE__)
    @server_port = 8000
    @server = WEBrick::HTTPServer.new(:Port => @server_port, :DocumentRoot => root)
    @thread = Thread.new { @server.start }
  end

  def teardown
    @server.shutdown
    @thread = nil
  end

  def test_should_explain_transaction
    visit "http://localhost:#{@server_port}/freeagent-unexplained-transaction.html"
    page.execute_script("window.rulesUrl = 'http://localhost:#{@server_port}/test-rules.json'")
    page.execute_script(File.read(File.expand_path('../../../lib/freeagent-transaction-helper.js', __FILE__)))

    assert page.has_select?('purchase_sales_tax_rate', selected: '0')
    assert page.has_select?('spending_category', selected: 'Sundries')
    assert page.has_field?('description', with: 'Pact Coffee London')
    assert page.has_checked_field?('Non-EC')
    assert page.has_text?('Now upload an attachment!')
  end
end
