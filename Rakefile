require 'rake/testtask'
require 'jasmine'
load 'jasmine/tasks/jasmine.rake'

task default: ['jasmine:ci', 'test:integration']

Rake::TestTask.new('test:integration') do |t|
  t.test_files = FileList['spec/integration/*_test.rb']
  t.verbose = true
end
