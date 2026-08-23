/**
 * Public Sanitized Question Templates for ARIS Entrance Assessment
 * Mirrors Database Exam cce291f7-d88b-4976-8ed3-cc21daca7023
 * Contains ZERO secret answer keys. Safe for client-facing test delivery.
 */

export interface SanitizedQuestion {
  id: string;
  skill: "listening" | "reading" | "grammar" | "writing" | "speaking";
  sectionTitle: string;
  questionType:
    | "multiple_choice"
    | "fill_blank"
    | "true_false_not_given"
    | "short_answer"
    | "matching"
    | "essay"
    | "text_area"
    | "audio_record";
  prompt: string;
  passageText?: string;
  audioUrl?: string;
  options?: string[];
  placeholder?: string;
  orderIndex: number;
  blankCount?: number;
}

export interface SanitizedPlacementTestPayload {
  testId: string;
  title: string;
  durationMinutes: number;
  totalQuestions: number;
  skills: {
    listening: {
      title: string;
      audioUrl: string;
      questions: SanitizedQuestion[];
    };
    reading: {
      title: string;
      passage: string;
      questions: SanitizedQuestion[];
    };
    grammar: {
      title: string;
      questions: SanitizedQuestion[];
    };
    writing: {
      title: string;
      prompt: string;
      guidelines: string[];
      minWords: number;
      maxWords?: number;
    };
    speaking: {
      title: string;
      part1Questions: string[];
      part2Topic: string;
      part2Cues: string[];
    };
  };
}

export const canonicalPlacementTestPayload: SanitizedPlacementTestPayload = {
  testId: "cce291f7-d88b-4976-8ed3-cc21daca7023",
  title: "ENTRANCE TEST — ARIS Diagnostic Assessment",
  durationMinutes: 60,
  totalQuestions: 35, // 10 Listening + 13 Reading + 10 Grammar = 33 Obj + 2 Subj
  skills: {
    listening: {
      title: "Kỹ năng Nghe (Listening)",
      audioUrl: "https://gzpdlqxjggyxlkeatvvf.supabase.co/storage/v1/object/public/exam-assets/audio/1787423782098-cambridge-ielts-13-academic-listening-1-audio-1.mp3",
      questions: [
        {
          id: "43907def-1f78-4839-8751-ff1079fdee91",
          skill: "listening",
          sectionTitle: "Kỹ năng Nghe (Listening)",
          questionType: "fill_blank",
          prompt: "<span id=\"docs-internal-guid-4fda0c15-7fff-c920-4698-81ecd7e90be9\"><p dir=\"ltr\" style=\"line-height:1.295;text-align: center;margin-top:0pt;margin-bottom:8pt;\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 700; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\"><font size=\"4\">COOKERY CLASSES</font></span></p><div dir=\"ltr\" style=\"margin-left:0pt;\" align=\"left\"><table style=\"border: none;\"><colgroup><col width=\"153\"><col width=\"187\"><col width=\"302\"></colgroup><tbody><tr style=\"height:0pt\"><td style=\"border-width: 0.75pt; border-color: rgb(0, 0, 0); vertical-align: middle; padding: 7.5pt; overflow: hidden; overflow-wrap: break-word;\"><p dir=\"ltr\" style=\"line-height:1.295;text-align: center;margin-top:0pt;margin-bottom:8pt;\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 700; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\"><font size=\"4\">Cookery Class</font></span></p></td><td style=\"border-width: 0.75pt; border-color: rgb(0, 0, 0); vertical-align: middle; padding: 7.5pt; overflow: hidden; overflow-wrap: break-word;\"><p dir=\"ltr\" style=\"line-height:1.295;text-align: center;margin-top:0pt;margin-bottom:8pt;\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 700; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\"><font size=\"4\">Focus</font></span></p></td><td style=\"border-width: 0.75pt; border-color: rgb(0, 0, 0); vertical-align: middle; padding: 7.5pt; overflow: hidden; overflow-wrap: break-word;\"><p dir=\"ltr\" style=\"line-height:1.295;text-align: center;margin-top:0pt;margin-bottom:8pt;\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 700; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\"><font size=\"4\">Other Information</font></span></p></td></tr><tr style=\"height:0pt\"><td style=\"border-width: 0.75pt; border-color: rgb(0, 0, 0); vertical-align: middle; padding: 7.5pt; overflow: hidden; overflow-wrap: break-word;\"><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-style: italic; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\"><font size=\"4\">Example</font></span></p><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><font size=\"4\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">The Food …</span><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-style: italic; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">Studio</span><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">…</span></font></p></td><td style=\"border-width: 0.75pt; border-color: rgb(0, 0, 0); vertical-align: middle; padding: 7.5pt; overflow: hidden; overflow-wrap: break-word;\"><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><font size=\"4\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">how to&nbsp;</span><span style=\"background-color: rgb(243, 245, 247); color: rgb(20, 184, 165); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, &quot;Liberation Mono&quot;, &quot;Courier New&quot;, monospace;\">[BLANK_1]&nbsp;</span><span style=\"background-color: transparent; color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;, serif; white-space-collapse: preserve;\">and cook with seasonal products</span></font></p></td><td style=\"border-width: 0.75pt; border-color: rgb(0, 0, 0); vertical-align: middle; padding: 7.5pt; overflow: hidden; overflow-wrap: break-word;\"><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\"><font size=\"4\">●&nbsp;&nbsp; small classes</font></span></p><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><font size=\"4\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">●&nbsp;&nbsp; also offers </span><span style=\"background-color: rgb(243, 245, 247); color: rgb(20, 184, 165); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, &quot;Liberation Mono&quot;, &quot;Courier New&quot;, monospace;\">[BLANK_2]</span></font></p><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\"><font size=\"4\">&nbsp; classes</font></span></p><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><font size=\"4\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">●&nbsp;&nbsp; clients who return get a&nbsp;</span><span style=\"background-color: rgb(243, 245, 247); color: rgb(20, 184, 165); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, &quot;Liberation Mono&quot;, &quot;Courier New&quot;, monospace;\">[BLANK_3]&nbsp;</span></font><span style=\"font-size: large; background-color: transparent; color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;, serif; white-space-collapse: preserve;\">discount</span></p></td></tr><tr style=\"height:0pt\"><td style=\"border-width: 0.75pt; border-color: rgb(0, 0, 0); vertical-align: middle; padding: 7.5pt; overflow: hidden; overflow-wrap: break-word;\"><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\"><font size=\"4\">Bond’s Cookery School</font></span></p></td><td style=\"border-width: 0.75pt; border-color: rgb(0, 0, 0); vertical-align: middle; padding: 7.5pt; overflow: hidden; overflow-wrap: break-word;\"><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><font size=\"4\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">food that is</span><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 700; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">&nbsp;</span><span style=\"background-color: rgb(243, 245, 247); color: rgb(20, 184, 165); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, &quot;Liberation Mono&quot;, &quot;Courier New&quot;, monospace;\">[BLANK_4]</span></font></p></td><td style=\"border-width: 0.75pt; border-color: rgb(0, 0, 0); vertical-align: middle; padding: 7.5pt; overflow: hidden; overflow-wrap: break-word;\"><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><font size=\"4\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">●&nbsp;&nbsp; includes recipes to strengthen your</span><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\"> </span><span style=\"background-color: rgb(243, 245, 247); color: rgb(20, 184, 165); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, &quot;Liberation Mono&quot;, &quot;Courier New&quot;, monospace;\">[BLANK_5]</span></font></p><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><font size=\"4\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">●&nbsp;&nbsp; they have a free&nbsp;</span><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 700; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">6 </span><span style=\"background-color: rgb(243, 245, 247); color: rgb(20, 184, 165); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, &quot;Liberation Mono&quot;, &quot;Courier New&quot;, monospace;\">[BLANK_6]</span></font></p><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\"><font size=\"4\">&nbsp;Every Thursday</font></span></p></td></tr><tr style=\"height:0pt\"><td style=\"border-width: 0.75pt; border-color: rgb(0, 0, 0); vertical-align: middle; padding: 7.5pt; overflow: hidden; overflow-wrap: break-word;\"><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><font size=\"4\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">The&nbsp;</span><span style=\"background-color: rgb(243, 245, 247); color: rgb(20, 184, 165); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, &quot;Liberation Mono&quot;, &quot;Courier New&quot;, monospace;\">[BLANK_7]</span><span style=\"background-color: transparent; color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;, serif; white-space-collapse: preserve;\"> Centre</span></font></p></td><td style=\"border-width: 0.75pt; border-color: rgb(0, 0, 0); vertical-align: middle; padding: 7.5pt; overflow: hidden; overflow-wrap: break-word;\"><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><font size=\"4\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">mainly&nbsp;</span><span style=\"background-color: rgb(243, 245, 247); color: rgb(20, 184, 165); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, &quot;Liberation Mono&quot;, &quot;Courier New&quot;, monospace;\">[BLANK_8]</span><span style=\"background-color: transparent; color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;, serif; white-space-collapse: preserve;\">&nbsp; food</span></font></p></td><td style=\"border-width: 0.75pt; border-color: rgb(0, 0, 0); vertical-align: middle; padding: 7.5pt; overflow: hidden; overflow-wrap: break-word;\"><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><font size=\"4\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">●&nbsp;&nbsp; located near the</span><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 700; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\"> </span><span style=\"background-color: rgb(243, 245, 247); color: rgb(20, 184, 165); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, &quot;Liberation Mono&quot;, &quot;Courier New&quot;, monospace;\">[BLANK_9]</span></font></p><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><font size=\"4\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">●&nbsp;&nbsp; a special course in skills with a&nbsp; </span><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 700; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\"> </span><span style=\"background-color: rgb(243, 245, 247); color: rgb(20, 184, 165); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, &quot;Liberation Mono&quot;, &quot;Courier New&quot;, monospace;\">[BLANK_10]</span></font></p><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\"><font size=\"4\"> is sometimes available</font></span></p></td></tr></tbody></table><br></div></span>",
          placeholder: "Nhập câu trả lời...",
          orderIndex: 1,
          blankCount: 10,
        },
      ],
    },
    reading: {
      title: "Kỹ năng Đọc hiểu (Reading)",
      passage: "<p style=\"text-align: center;\"><b>Case Study: Tourism New Zealand website</b></p>\n\n<p style=\"text-align: justify; \">New Zealand is a small country of\nfour million inhabitants, a long-haul flight from all the major\ntourist-generating markets of the world. Tourism currently makes up 9% of the\ncountry’s gross domestic product, and is the country’s largest export sector. Unlike\nother export sectors, which make products and then sell them overseas, tourism\nbrings its customers to New Zealand. The product is the country itself – the\npeople, the places and the experiences. In 1999, Tourism New Zealand launched a\ncampaign to communicate a new brand position to the world. The campaign focused\non New Zealand’s scenic beauty, exhilarating outdoor activities and authentic\nMaori culture, and it made New Zealand one of the strongest national brands in\nthe world.</p>\n\n<p style=\"text-align: justify;\">A key feature of the campaign was the\nwebsite www.newzealand.com, which provided potential visitors to New Zealand\nwith a single gateway to everything the destination had to offer. The heart of\nthe website was a database of tourism services operators, both those based in\nNew Zealand and those based abroad which offered tourism service to the\ncountry. Any tourism-related business could be listed by filling in a simple\nform. This meant that even the smallest bed and breakfast address or specialist\nactivity provider could gain a web presence with access to an audience of\nlong-haul visitors. In addition, because participating businesses were able to\nupdate the details they gave on a regular basis, the information provided\nremained accurate. And to maintain and improve standards, Tourism New Zealand\norganised a scheme whereby organisations appearing on the website underwent an\nindependent evaluation against a set of agreed national standards of quality.\nAs part of this, the effect of each business on the environment was considered.</p>\n\n<p style=\"text-align: justify;\">To communicate the New Zealand\nexperience, the site also carried features relating to famous people and\nplaces.One of the most popular was an interview with former New Zealand All\nBlacks rugby captain Tana Umaga. Another feature that attracted a lot of attention\nwas an interactive journey through a number of the locations chosen for\nblockbuster films which had made use of New Zealand’s stunning scenery as a\nbackdrop. As the site developed, additional features were added to help\nindependent travelers devise their own customised itineraries. To make it\neasier to plan motoring holidays, the site catalogued the most popular driving\nroutes in the country, highlighting different routes according to the season\nand indicating distances and times.</p>\n\n<p style=\"text-align: justify;\">Later, a Travel Planner feature was\nadded, which allowed visitors to click and ‘bookmark’ places or attractions\nthey were interested in, and then view the results on a map. The Travel Planner\noffered suggested routes and public transport options between the chosen\nlocations. There were also links to accommodation in the area. By registering\nwith the website, users could save their Travel Plan and return to it later, or\nprint it out to take on the visit. The website also had a ‘Your Words’ section\nwhere anyone could submit a blog of their New Zealand travels for possible\ninclusion on the website.</p>\n\n<p style=\"text-align: justify;\">The Tourism New Zealand website won\ntwo Webby awards for online achievement and innovation. More importantly\nperhaps, the growth of tourism to New Zealand was impressive. Overall tourism\nexpenditure increased by an average of 6.9% per year between 1999 and 2004.\nFrom Britain, visits to New Zealand grew at an average annual rate of 13%\nbetween 2002 and 2006, compared to a rate of 4% overall for British visits\nabroad.</p>\n\n<p style=\"text-align: justify;\">The website was set up to allow both\nindividuals and travel organisations to create itineraries and travel packages\nto suit their own needs and interests. On the website, visitors can search for\nactivities not solely by geographical location, but also by the particular\nnature of the activity. This is important as research shows that activities are\nthe key driver of visitor satisfaction, contributing 74% to visitor satisfaction,\nwhile transport and accommodation account for the remaining 26%. The more\nactivities that visitors undertake, the more satisfied they will be. It has\nalso been found that visitors enjoy cultural activities most when they are\ninteractive, such as visiting a marae (meeting ground) to learn about\ntraditional Maori life. Many long-haul travelers enjoy such learning\nexperiences, which provide them with stories to take home to their friends and\nfamily. In addition, it appears that visitors to New Zealand don’t want to be\n‘one of the crowd’ and find activities that involve only a few people more\nspecial and meaningful.</p>\n\n<p style=\"text-align: justify; \">It could be argued that New Zealand\nis not a typical destination. New Zealand is a small country with a visitor\neconomy composed mainly of small businesses. It is generally perceived as a\nsafe English-speaking country with a reliable transport infrastructure. Because\nof the long-haul flight, most visitors stay for longer (average 20 days) and\nwant to see as much of the country as possible on what is often seen as a\nonce-in-a-lifetime visit. However, the underlying lessons apply anywhere – the\neffectiveness of a strong brand, a strategy based on unique experiences and a\ncomprehensive and user-friendly website.</p>",
      questions: [
        {
          id: "c0d8e9bd-f426-42c3-b051-4c15df13543a",
          skill: "reading",
          sectionTitle: "Kỹ năng Đọc hiểu (Reading)",
          questionType: "fill_blank",
          prompt: "<span id=\"docs-internal-guid-e5c541aa-7fff-2bf7-1432-8f708b4f0ed0\"><font size=\"4\"><p dir=\"ltr\" style=\"line-height: 1.295; margin-top: 0pt; margin-bottom: 8pt;\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 700; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">Questions 1-7</span></p><p dir=\"ltr\" style=\"line-height: 1.295; margin-top: 0pt; margin-bottom: 8pt;\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">Complete the table below. Choose ONE WORD ONLY from the passage for each answer. Write your answers in boxes 1-7 on your answer sheet.</span></p><div dir=\"ltr\" style=\"margin-left: 0pt;\" align=\"left\"><table style=\"border: none;\"><colgroup><col width=\"207\"><col width=\"406\"></colgroup><tbody><tr style=\"height:0pt\"><td style=\"border-width: 0.75pt; border-color: rgb(0, 0, 0); vertical-align: middle; background-color: rgb(255, 255, 255); padding: 7.5pt; overflow: hidden; overflow-wrap: break-word;\"><p dir=\"ltr\" style=\"line-height:1.295;text-align: center;margin-top:0pt;margin-bottom:8pt;\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 700; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">Section of website</span></p></td><td style=\"border-width: 0.75pt; border-color: rgb(0, 0, 0); vertical-align: middle; background-color: rgb(255, 255, 255); padding: 7.5pt; overflow: hidden; overflow-wrap: break-word;\"><p dir=\"ltr\" style=\"line-height:1.295;text-align: center;margin-top:0pt;margin-bottom:8pt;\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 700; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">Comments</span></p></td></tr><tr style=\"height:0pt\"><td style=\"border-width: 0.75pt; border-color: rgb(0, 0, 0); vertical-align: middle; background-color: rgb(255, 255, 255); padding: 7.5pt; overflow: hidden; overflow-wrap: break-word;\"><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">Database of tourism services</span></p></td><td style=\"border-width: 0.75pt; border-color: rgb(0, 0, 0); vertical-align: middle; background-color: rgb(255, 255, 255); padding: 7.5pt; overflow: hidden; overflow-wrap: break-word;\"><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">•&nbsp; &nbsp;easy for tourism-related businesses to get on the list</span></p><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">•&nbsp;&nbsp;&nbsp;allowed businesses to&nbsp;</span><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\"><span style=\"color: rgb(20, 184, 165); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, &quot;Liberation Mono&quot;, &quot;Courier New&quot;, monospace; white-space-collapse: collapse; background-color: rgb(243, 245, 247);\">[BLANK_1]</span>&nbsp; information regularly</span></p><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">•&nbsp;&nbsp;&nbsp;provided a country-wide evaluation of businesses, including their impact on the&nbsp;</span><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\"><span style=\"color: rgb(20, 184, 165); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, &quot;Liberation Mono&quot;, &quot;Courier New&quot;, monospace; white-space-collapse: collapse; background-color: rgb(243, 245, 247);\">[BLANK_2]</span>&nbsp;.</span></p></td></tr><tr style=\"height:0pt\"><td style=\"border-width: 0.75pt; border-color: rgb(0, 0, 0); vertical-align: middle; background-color: rgb(255, 255, 255); padding: 7.5pt; overflow: hidden; overflow-wrap: break-word;\"><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">Special features on local topics</span></p></td><td style=\"border-width: 0.75pt; border-color: rgb(0, 0, 0); vertical-align: middle; background-color: rgb(255, 255, 255); padding: 7.5pt; overflow: hidden; overflow-wrap: break-word;\"><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">•&nbsp;&nbsp;&nbsp;e.g. an interview with a former sports&nbsp;</span><span style=\"color: rgb(20, 184, 165); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, &quot;Liberation Mono&quot;, &quot;Courier New&quot;, monospace; background-color: rgb(243, 245, 247);\">[BLANK_3]</span><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">&nbsp;, and an interactive tour of various locations used in&nbsp;</span><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\"> <span style=\"color: rgb(20, 184, 165); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, &quot;Liberation Mono&quot;, &quot;Courier New&quot;, monospace; white-space-collapse: collapse; background-color: rgb(243, 245, 247);\">[BLANK_4]</span>&nbsp;.</span></p></td></tr><tr style=\"height:0pt\"><td style=\"border-width: 0.75pt; border-color: rgb(0, 0, 0); vertical-align: middle; background-color: rgb(255, 255, 255); padding: 7.5pt; overflow: hidden; overflow-wrap: break-word;\"><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">Information on driving routes</span></p></td><td style=\"border-width: 0.75pt; border-color: rgb(0, 0, 0); vertical-align: middle; background-color: rgb(255, 255, 255); padding: 7.5pt; overflow: hidden; overflow-wrap: break-word;\"><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">•&nbsp;&nbsp;&nbsp;varied depending on the&nbsp;</span><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 700; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\"> </span><span style=\"color: rgb(20, 184, 165); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, &quot;Liberation Mono&quot;, &quot;Courier New&quot;, monospace; background-color: rgb(243, 245, 247);\">[BLANK_5]</span><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">&nbsp;.&nbsp;</span></p></td></tr><tr style=\"height:0pt\"><td style=\"border-width: 0.75pt; border-color: rgb(0, 0, 0); vertical-align: middle; background-color: rgb(255, 255, 255); padding: 7.5pt; overflow: hidden; overflow-wrap: break-word;\"><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">Travel Planner</span></p></td><td style=\"border-width: 0.75pt; border-color: rgb(0, 0, 0); vertical-align: middle; background-color: rgb(255, 255, 255); padding: 7.5pt; overflow: hidden; overflow-wrap: break-word;\"><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">•&nbsp;&nbsp;&nbsp;included a map showing selected places, details of public transport and local</span><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 700; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\"> </span><span style=\"color: rgb(20, 184, 165); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, &quot;Liberation Mono&quot;, &quot;Courier New&quot;, monospace; background-color: rgb(243, 245, 247);\">[BLANK_6]</span><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">&nbsp;.</span></p></td></tr><tr style=\"height:0pt\"><td style=\"border-width: 0.75pt; border-color: rgb(0, 0, 0); vertical-align: middle; background-color: rgb(255, 255, 255); padding: 7.5pt; overflow: hidden; overflow-wrap: break-word;\"><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">‘Your Words’</span></p></td><td style=\"border-width: 0.75pt; border-color: rgb(0, 0, 0); vertical-align: middle; background-color: rgb(255, 255, 255); padding: 7.5pt; overflow: hidden; overflow-wrap: break-word;\"><p dir=\"ltr\" style=\"line-height:1.295;margin-top:0pt;margin-bottom:8pt;\"><span style=\"font-family: &quot;Times New Roman&quot;, serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; vertical-align: baseline; white-space-collapse: preserve;\">•&nbsp; &nbsp;travelers could send a link to their&nbsp; </span><span style=\"background-color: rgb(243, 245, 247); color: rgb(20, 184, 165); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, &quot;Liberation Mono&quot;, &quot;Courier New&quot;, monospace;\">[BLANK_7]</span><span style=\"background-color: transparent; color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;, serif; white-space-collapse: preserve;\">.</span></p></td></tr></tbody></table></div></font></span>",
          placeholder: "Nhập câu trả lời...",
          orderIndex: 1,
          blankCount: 7,
        },
        {
          id: "e6084ef6-30d7-421b-9935-c15e506d4049",
          skill: "reading",
          sectionTitle: "Kỹ năng Đọc hiểu (Reading)",
          questionType: "true_false_not_given",
          prompt: "8. The website www.newzealand.com aimed to provide ready-made itineraries and packages for travel companies and individual tourists.",
          options: ["TRUE", "FALSE", "NOT GIVEN"],
          orderIndex: 8,
          blankCount: 1,
        },
        {
          id: "de50e60b-f74c-4948-905f-03f5ba2c0b6d",
          skill: "reading",
          sectionTitle: "Kỹ năng Đọc hiểu (Reading)",
          questionType: "true_false_not_given",
          prompt: "9. It was found that most visitors started searching on the website by geographical location.",
          options: ["TRUE", "FALSE", "NOT GIVEN"],
          orderIndex: 9,
          blankCount: 1,
        },
        {
          id: "e19ac399-6094-4a0c-9003-b54abc5e0f40",
          skill: "reading",
          sectionTitle: "Kỹ năng Đọc hiểu (Reading)",
          questionType: "true_false_not_given",
          prompt: "10. According to research, 26% of visitor satisfaction is related to their accommodationn",
          options: ["TRUE", "FALSE", "NOT GIVEN"],
          orderIndex: 10,
          blankCount: 1,
        },
        {
          id: "00d76f65-dd5f-4dc1-98de-8c235f37f834",
          skill: "reading",
          sectionTitle: "Kỹ năng Đọc hiểu (Reading)",
          questionType: "true_false_not_given",
          prompt: "11. Visitors to New Zealand like to become involved in the local culture",
          options: ["TRUE", "FALSE", "NOT GIVEN"],
          orderIndex: 11,
          blankCount: 1,
        },
        {
          id: "578ed22b-adee-4442-92ab-c04a1951d902",
          skill: "reading",
          sectionTitle: "Kỹ năng Đọc hiểu (Reading)",
          questionType: "true_false_not_given",
          prompt: "12. Visitors like staying in small hotels in New Zealand rather than in larger ones",
          options: ["TRUE", "FALSE", "NOT GIVEN"],
          orderIndex: 12,
          blankCount: 1,
        },
        {
          id: "6268c893-6886-499e-81c3-194dea9cd9f2",
          skill: "reading",
          sectionTitle: "Kỹ năng Đọc hiểu (Reading)",
          questionType: "true_false_not_given",
          prompt: "13. Many visitors feel it is unlikely that they will return to New Zealand after their visit",
          options: ["TRUE", "FALSE", "NOT GIVEN"],
          orderIndex: 13,
          blankCount: 1,
        }
      ],
    },
    grammar: {
      title: "Ngữ pháp & Từ vựng (Grammar)",
      questions: [
        {
          id: "7b3cc213-6fbc-4e41-8ed7-9420773fd55a",
          skill: "grammar",
          sectionTitle: "Ngữ pháp & Từ vựng (Grammar)",
          questionType: "multiple_choice",
          prompt: "My brother usually ___ to work by bus.",
          options: ["go","goes","is going","going"],
          orderIndex: 1,
          blankCount: 1,
        },
        {
          id: "5ba28972-e776-4953-b05e-41d6a862c4ed",
          skill: "grammar",
          sectionTitle: "Ngữ pháp & Từ vựng (Grammar)",
          questionType: "multiple_choice",
          prompt: "I ___ this book three times, but I still find it interesting.",
          options: ["read","am reading","have read","had read"],
          orderIndex: 2,
          blankCount: 1,
        },
        {
          id: "afd8852d-5f56-413d-99ef-73cd89c969d4",
          skill: "grammar",
          sectionTitle: "Ngữ pháp & Từ vựng (Grammar)",
          questionType: "multiple_choice",
          prompt: "The results of the survey ___ to all participants next week.",
          options: ["will send","will be sent","are sending","have sent"],
          orderIndex: 3,
          blankCount: 1,
        },
        {
          id: "59739e98-711b-4d4b-8927-e5f97c0d3a32",
          skill: "grammar",
          sectionTitle: "Ngữ pháp & Từ vựng (Grammar)",
          questionType: "multiple_choice",
          prompt: "There isn't ___ information available about the causes of the problem.",
          options: ["many","a few","much","several"],
          orderIndex: 4,
          blankCount: 1,
        },
        {
          id: "380a1c22-1b82-478a-863e-e5e9a2ac21dd",
          skill: "grammar",
          sectionTitle: "Ngữ pháp & Từ vựng (Grammar)",
          questionType: "multiple_choice",
          prompt: "She has worked for the company ___ 2019.",
          options: ["for","since","during","from"],
          orderIndex: 5,
          blankCount: 1,
        },
        {
          id: "36a7ce11-694e-4986-871b-96427ac6f798",
          skill: "grammar",
          sectionTitle: "Ngữ pháp & Từ vựng (Grammar)",
          questionType: "multiple_choice",
          prompt: "If governments ___ more money in public transport, traffic congestion would be reduced.",
          options: ["invest","invested","will invest","have invested"],
          orderIndex: 6,
          blankCount: 1,
        },
        {
          id: "307abd86-198d-4686-9c35-03e3b8d84520",
          skill: "grammar",
          sectionTitle: "Ngữ pháp & Từ vựng (Grammar)",
          questionType: "multiple_choice",
          prompt: "The students ___ submitted their assignments on time will receive additional feedback.",
          options: ["which","whom","whose","who"],
          orderIndex: 7,
          blankCount: 1,
        },
        {
          id: "af2cb913-45db-4ee3-a2bb-870d79d44334",
          skill: "grammar",
          sectionTitle: "Ngữ pháp & Từ vựng (Grammar)",
          questionType: "multiple_choice",
          prompt: "Many people find it difficult ___ a healthy work-life balance.",
          options: ["maintain","maintaining","to maintain","maintained"],
          orderIndex: 8,
          blankCount: 1,
        },
        {
          id: "ecd26e7b-aaae-45a1-b3c2-52bcdd8409af",
          skill: "grammar",
          sectionTitle: "Ngữ pháp & Từ vựng (Grammar)",
          questionType: "multiple_choice",
          prompt: "Despite ___ several advantages, the new system has some significant limitations.",
          options: ["have","having","to have","had"],
          orderIndex: 9,
          blankCount: 1,
        },
        {
          id: "eea6e4cd-4eda-4de6-904c-c4c2a834f0a7",
          skill: "grammar",
          sectionTitle: "Ngữ pháp & Từ vựng (Grammar)",
          questionType: "multiple_choice",
          prompt: "By the time the researchers arrived, the experiment ___.",
          options: ["already finished","has already finished","had already finished","was already finishing"],
          orderIndex: 10,
          blankCount: 1,
        }
      ],
    },
    writing: {
      title: "Kỹ năng Viết (Writing)",
      prompt: "<font size=\"4\"><u style=\"color: rgb(0, 0, 0);\">Viết một bài văn khoảng 100–150 từ trả lời câu hỏi sau:</u></font><div><font size=\"4\"><b><i style=\"color: rgb(147, 51, 234);\">Some people think that students should be required to learn a foreign language in school. Do you agree or disagree? Give reasons and examples.</i></b></font></div>",
      guidelines: [
        "Viết tối thiểu 100 từ, phát triển ít nhất 2 luận điểm rõ ràng.",
        "Sử dụng đa dạng cấu trúc câu ghép, câu phức và từ vựng học thuật.",
        "Trình bày mạch lạc với mở bài, thân bài và kết bài.",
      ],
      minWords: 80,
      maxWords: 400,
    },
    speaking: {
      title: "Kỹ năng Nói (Speaking)",
      part1Questions: [
        "1. Tell me about your hometown. What do you like most about living there?",
        "2. How do you usually study or practice English in your free time?",
      ],
      part2Topic: "Describe an important goal or ambition you have set for yourself recently.",
      part2Cues: [
        "What the goal is",
        "When and why you decided to pursue it",
        "What steps you need to take to accomplish it",
        "And explain how achieving this goal will change your life.",
      ],
    },
  },
};
