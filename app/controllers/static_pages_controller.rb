class StaticPagesController < ApplicationController
	require 'rubygems'
	require 'gems'

  def root
  	@term = ''
  end

  def favorites
  end

  def search
  	if request.method != "POST"
  		redirect_to root_path
  	else
  		search_term = params['term']
  		results = Gems.search search_term
  		result = results.find { |r| r["name"] == search_term }
  		if result && request.xhr?
	 			depends = result["dependencies"]["runtime"] + result["dependencies"]["development"]
 				dependencies = depends.map { |d| d["name"] }
  			render partial: 'partials/results', locals: { result: result, dependencies: dependencies.uniq }
  		elsif request.xhr?
  			error = "Oh no! Looks like that gem can't be found."
  			render partial: 'partials/no_results', locals: { error: error }
   		end
  	end
  end

end