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
  cmds << 'mkdir -p package'
  cmds << 'cd lib'
  cmds << 'zip -q -r freeagent_transaction_explainer.zip *'
  cmds << 'mv freeagent_transaction_explainer.zip ../package'
  system cmds.join(' && ')

  puts "All done. You'll find the zipped extension in the ./package directory"
end
