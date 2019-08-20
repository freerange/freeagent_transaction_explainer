require 'bundler/setup'

require 'capybara'
require 'capybara/rspec'
require 'capybara/poltergeist'

Capybara.configure do |config|
  config.save_path = File.expand_path('../../../tmp/capybara/', __FILE__)
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

  it 'explains transaction with 0% VAT', :js do
    visit '/freeagent-unexplained-transaction.html'
    execute_freeagent_transaction_helper_in_page('/test-rules-zero-vat.json')

    expect(page).to have_select('purchase_sales_tax_rate', selected: '0%')
    expect(page).to have_select('spending_category', selected: 'Sundries')
    expect(page).to have_field('description', with: 'Pact Coffee London')
    expect(page).to have_checked_field('EC Services')
    expect(page).to have_text('Now upload an attachment!')
  end

  it 'explains transaction with manual VAT amount', :js do
    visit '/freeagent-unexplained-transaction.html'
    execute_freeagent_transaction_helper_in_page('/test-rules-manual-vat.json')

    expect(page).to have_select('purchase_sales_tax_rate', selected: 'Amount...')
    expect(page).to have_field('purchase_sales_tax_amount', with: '???')
  end

  it 'informs user that a matching rule cannot be found', :js do
    visit '/freeagent-unexplained-transaction.html'
    execute_freeagent_transaction_helper_in_page('/test-rules-empty.json')

    expect(page).to have_text('No matching rules found')
  end

  private

  def execute_freeagent_transaction_helper_in_page(rules_path)
    rules_url = "http://#{@server.host}:#{@server.port}#{rules_path}"
    page.execute_script(
      File.read(File.expand_path('../../../lib/jquery-2.1.1.min.js', __FILE__)) +
      File.read(File.expand_path('../../../lib/jquery-ui-1.11.0.min.js', __FILE__)) +
      File.read(File.expand_path('../../../lib/freeagent-transaction-explainer.js', __FILE__)) +
      "FreeAgentTransactionHelper('#{rules_url}')"
    )
  end
end
