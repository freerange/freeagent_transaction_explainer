require 'jasmine'
load 'jasmine/tasks/jasmine.rake'

require 'rspec/core/rake_task'
RSpec::Core::RakeTask.new(:spec)

task default: ['jasmine:ci', 'spec']

desc <<-Desc
Zip up the Chrome extension ready to be uploaded to the Chrome Web Store
Developer dashboard. You'll find the zip file in the package directory.
Desc
task :zip_up_extension do
  cmds = []
  cmds += ['mkdir -p package']
  cmds += ['cd lib']
  cmds += ['zip -q -r free_agent_transaction_explainer.zip *']
  cmds += ['mv free_agent_transaction_explainer.zip ../package']
  system cmds.join(' && ')
end
