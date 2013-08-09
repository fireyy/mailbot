var qs = require('querystring')

var paginate = function(count, nPerPage, pageNumber, opts) {
  var dots, link, n, n_display, output, page_links, settings = {};
  opts = opts || {}

  settings['base'] = '%_%';
  settings['format'] = '%#%';
  settings['total'] = parseInt(Math.ceil(count / nPerPage));
  settings['current'] = parseInt(pageNumber);
  settings['show_all'] = false;
  settings['prev_next'] = true;
  settings['prev_text'] = '&laquo';
  settings['next_text'] = '&raquo';
  settings['end_size'] = 1;
  settings['mid_size'] = 1;
  settings['add_args'] = parseAdditionalArgs(opts.add_args || '');
  page_links = [];
  dots = false;
  if (settings['prev_text'] && settings['current'] && 1 < settings['current']) {
    link = settings["base"].replace("%_%", settings["format"]);
    link = link.replace("%#%", settings["current"] - 1);
    page_links.push('<a class="prev" href="' + link + settings["add_args"]
     + '">' + settings["prev_text"] + '</a>');
  }
  for (n=1; n <= settings["total"]; n++) {
    n_display = n;
    if (n === settings["current"]) {
      page_links.push('<strong>' + n_display + '</strong>');
      dots = true;
    } else {
      if (settings["show_all"] || (n <= settings["end_size"]
       || (settings["current"] && n >= settings["current"] - settings["mid_size"]
       && n <= settings["current"] + settings["mid_size"])
       || n > settings["total"] - settings["end_size"])) {
        link = settings["base"].replace("%_%", settings["format"]);
        link = link.replace("%#%", n);
        page_links.push('<a href="' + link + settings["add_args"] + '">' 
                        + n_display + '</a>');
        dots = true;
      } else if (dots && !settings["show_all"]) {
        page_links.push('<strong>&#8230;</strong>');
        dots = false;
      }
    }
  }
  if (settings["prev_next"] && settings["current"] 
      && (settings["current"] < settings["total"] 
          || -1 === settings["total"])) {
    link = settings["base"].replace("%_%", settings["format"]);
    link = link.replace("%#%", parseInt(settings["current"]) + 1);
    page_links.push('<a class="next" href="' + link + settings["add_args"]
     + '">' + settings["next_text"] + '</a>');
  }
  return '<aside class="paging">' + page_links.join("\n") + '</aside>';
}

function parseAdditionalArgs(args){
  return args==''? args: '&'+qs.encode(args)
}

module.exports = paginate;