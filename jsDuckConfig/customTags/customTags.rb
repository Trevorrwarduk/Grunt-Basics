require "jsduck/tag/tag"

class Platform < JsDuck::Tag::Tag
  def initialize
    @tagname = :platform
    @pattern = "platform"
    @html_position = POS_DOC + 0.1
    @repeatable = true
  end

  def parse_doc(scanner, position)
    text = scanner.match(/.*$/)
    return { :tagname => :platform, :text => text }
  end

  def process_doc(context, platform_tags, position)
    context[:platform] = platform_tags.map {|tag| tag[:text] }
  end

  def to_html(context)
    platforms = context[:platform].map {|platform| "<b>#{platform}</b>" }.join(" and ")
    <<-EOHTML
      <p>Platform: #{platforms}</p>
    EOHTML
  end
end

class Formfactor < JsDuck::Tag::Tag
  def initialize
    @tagname = :formfactor
    @pattern = "formfactor"
    @html_position = POS_DOC + 0.1
    @repeatable = true
  end

  def parse_doc(scanner, position)
    text = scanner.match(/.*$/)
    return { :tagname => :formfactor, :text => text }
  end

  def process_doc(context, formfactor_tags, position)
    context[:formfactor] = formfactor_tags.map {|tag| tag[:text] }
  end

  def to_html(context)
    formfactors = context[:formfactor].map {|formfactor| "<b>#{formfactor}</b>" }.join(" and ")
    <<-EOHTML
      <p>Form Factor: #{formfactors}</p>
    EOHTML
  end
end

class License < JsDuck::Tag::Tag
  def initialize
    @tagname = :license
    @pattern = "license"
    @html_position = POS_DOC + 0.1
    @repeatable = true
  end

  def parse_doc(scanner, position)
    text = scanner.match(/.*$/)
    return { :tagname => :license, :text => text }
  end

  def process_doc(context, license_tags, position)
    context[:license] = license_tags.map {|tag| tag[:text] }
  end

  def to_html(context)
    licenses = context[:license].map {|license| "<b>#{license}</b>" }.join(" and ")
    <<-EOHTML
      <p>License: #{licenses}</p>
    EOHTML
  end
end

class Link < JsDuck::Tag::Tag
  def initialize
    @tagname = :link
    @pattern = "link"
    @html_position = POS_DOC + 0.1
    @repeatable = true
  end

  def parse_doc(scanner, position)
    text = scanner.match(/.*$/)
    return { :tagname => :link, :text => text }
  end

  def process_doc(context, link_tags, position)
    context[:link] = link_tags.map {|tag| tag[:text] }
  end

  def to_html(context)
    links = context[:link].map {|link| "<b>#{link}</b>" }.join(" and ")
    <<-EOHTML
      <p>Link: #{links}</p>
    EOHTML
  end
end

class Public < JsDuck::Tag::Tag
  def initialize
    @tagname = :public
    @pattern = "public"
    @html_position = POS_DOC + 0.1
    @repeatable = true
  end

  def parse_doc(scanner, position)
    text = scanner.match(/.*$/)
    return { :tagname => :public, :text => text }
  end

  def process_doc(context, public_tags, position)
    context[:public] = public_tags.map {|tag| tag[:text] }
  end

  def to_html(context)
    publics = context[:public].map {|public| "<b>#{public}</b>" }.join(" and ")
    <<-EOHTML
      <p>Public: #{publics}</p>
    EOHTML
  end
end

class See < JsDuck::Tag::Tag
  def initialize
    @tagname = :see
    @pattern = "see"
    @html_position = POS_DOC + 0.1
    @repeatable = true
  end

  def parse_doc(scanner, position)
    text = scanner.match(/.*$/)
    return { :tagname => :see, :text => text }
  end

  def process_doc(context, see_tags, position)
    context[:see] = see_tags.map {|tag| tag[:text] }
  end

  def to_html(context)
    sees = context[:see].map {|see| "<b>#{see}</b>" }.join(" and ")
    <<-EOHTML
      <p>See: #{sees}</p>
    EOHTML
  end
end

