require 'bundler/setup'

require 'capybara'
require 'capybara/rspec'
require 'capybara/poltergeist'

Capybara.configure do |config|
  config.save_and_open_page_path = File.expand_path('../../../tmp/capybara/', __FILE__)
  config.javascript_driver = :poltergeist
  config.app = Rack::Directory.new(File.expand_path('../fixtures/', __FILE__))
end

RSpec.describe 'integration', type: :feature do
  before(:all) do
    @server = Capybara::Server.new(Capybara.app).boot
  end

  after(:all) do
    @server = nil
  end

  it 'explains transaction', :js do
    visit '/freeagent-unexplained-transaction.html'
    page.execute_script(File.read(File.expand_path('../../../lib/freeagent-transaction-explainer.js', __FILE__)) + "FreeAgentTransactionHelper('http://#{@server.host}:#{@server.port}/test-rules.json')")

    expect(page).to have_select('purchase_sales_tax_rate', selected: '0')
    expect(page).to have_select('spending_category', selected: 'Sundries')
    expect(page).to have_field('description', with: 'Pact Coffee London')
    expect(page).to have_checked_field('Non-EC')
    expect(page).to have_text('Now upload an attachment!')
  end

  it 'informs user that a matching rule cannot be found', :js do
    visit '/freeagent-unexplained-transaction.html'
    page.execute_script(File.read(File.expand_path('../../../lib/freeagent-transaction-explainer.js', __FILE__)) + "FreeAgentTransactionHelper('http://#{@server.host}:#{@server.port}/empty-test-rules.json')")

    expect(page).to have_text('No matching rules found')
  end
end
