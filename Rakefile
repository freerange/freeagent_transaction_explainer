require 'jasmine'
load 'jasmine/tasks/jasmine.rake'

require 'rspec/core/rake_task'
RSpec::Core::RakeTask.new(:spec)

task default: ['jasmine:ci', 'spec']

desc <<-Desc
Zip up the Chrome extension ready to be uploaded to the Chrome Web Store
Developer dashboard.
Desc
task :zip_up_extension do
  cmds = ['cd lib']
  cmds += ['zip -q -r free_agent_transaction_explainer.zip *']
  cmds += ['mv free_agent_transaction_explainer.zip ../']
  system cmds.join(' && ')
end
