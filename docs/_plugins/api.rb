module Jekyll
  class ApiDocTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @text = text.strip
    end

    def render(context)
      "\"<a href='../api/#{@text}'><b>#{@text}</b></a>\""
    end
  end
end

Liquid::Template.register_tag('api_doc', Jekyll::ApiDocTag)
