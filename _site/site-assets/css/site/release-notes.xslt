<?xml version="1.0" encoding="iso-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<!-- This causes the HTML doctype (<!doctype hmlt>) to be rendered. -->
	<xsl:output method="html" doctype-system="about:legacy-compat" indent="yes" />

	<!-- Start matching at the Channel node within the XML RSS feed. -->
	<xsl:template match="/rss/channel">

		<html lang="en">
		<head>
			<meta charset="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />

			<title>
				<xsl:value-of select="title" />
			</title>

			<link rel="shortcut icon" type="image/ico" href="https://support.brightcove.com/favicon.ico" />
      <link href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Source+Code+Pro&display=swap" rel="stylesheet">

			<link rel="stylesheet" type="text/css" href="https://support.brightcove.com/site-assets/css/site/release-notes.css" />
		</head>
		<body>

			<h1 class="title">
				<xsl:value-of select="title" />
			</h1>

			<p class="description">
				<xsl:value-of select="description" />
			</p>

			<ul class="posts">
				<xsl:for-each select="./item">

					<li class="posts__post post">

						<h2 class="post__title">
							<a href="{ link }" class="post__link">
								<xsl:value-of select="title" />
							</a>
						</h2>

						<p class="post__preview">
							<xsl:value-of select="description" />

							<a href="{ link }" class="post__more">Read more</a>
						</p>

					</li>

				</xsl:for-each>
			</ul>

			<p class="cta">
				<a href="{ link }" class="cta__link">View all posts on <strong>BenNadel.com</strong></a>
			</p>

		</body>
		</html>

	</xsl:template>

</xsl:stylesheet>
Alternative


<?xml version="1.0"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:content="http://purl.org/rss/1.0/modules/content/">

<xsl:output omit-xml-declaration="yes"/>

<xsl:strip-space elements="*"/>

<xsl:template match="channel">
    <xsl:apply-templates select="item"/>
</xsl:template>

<xsl:template match="item">
<xsl:text>&#10;</xsl:text>
<xsl:element name="article" namespace="">
    <xsl:apply-templates select="title|pubDate|content:encoded"/>
</xsl:element>
<xsl:text>&#10;</xsl:text>
</xsl:template>

<xsl:template match="title">
<xsl:text>&#10;</xsl:text>
<xsl:element name="h2" namespace="">
    <xsl:element name="a" namespace="">
        <xsl:attribute name="href">
            <xsl:value-of select="//channel/item/link"/>
        </xsl:attribute>
        <xsl:attribute name="target">_blank</xsl:attribute>
        <xsl:value-of select="."/>
    </xsl:element>
</xsl:element>
</xsl:template>

<xsl:template match="pubDate">
<xsl:text>&#10;</xsl:text>
<xsl:element name="time" namespace="">
<xsl:value-of select="."/>
</xsl:element>
</xsl:template>

<xsl:template match="content:encoded">
<xsl:text>&#10;</xsl:text>
<xsl:element name="div" namespace="">
<xsl:value-of select="substring-before(., '  &lt;a rel=&quot;nofollow')" disable-output-escaping="yes"/>
</xsl:element>
<xsl:text>&#10;</xsl:text>
</xsl:template>

</xsl:stylesheet>