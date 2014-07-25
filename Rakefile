require 'jasmine'
load 'jasmine/tasks/jasmine.rake'

require 'rspec/core/rake_task'
RSpec::Core::RakeTask.new(:spec)

task default: ['jasmine:ci', 'spec']
