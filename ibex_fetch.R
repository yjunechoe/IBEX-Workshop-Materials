tic()

library(dplyr)
library(rvest)
library(RSelenium)

list(chromeOptions = list(
  args = c('--headless', '--disable-gpu', '--window-size=1280,800')
))

rD <- rsDriver(
  browser = "firefox", port = 2020L, verbose = F,
  extraCapabilities = list(
    "moz:firefoxOptions" = list(
      args = list('--headless')
    )
  ))
remDr <- rD[["client"]]

remDr$navigate("https://spellout.net/ibexfarm/login")

Sys.sleep(1)

remDr$findElement(using = "name", value = "username")$sendKeysToElement(list("skku_ibex"))
remDr$findElement(using = "name", value = "password")$sendKeysToElement(list("2021workshop"))
remDr$findElement(using = "name", value = "submit")$clickElement()

Sys.sleep(1)

html <- remDr$getPageSource()[[1L]]

experiments <- read_html(html) %>%
  html_nodes("li.experiment") %>% 
  html_nodes("a") %>% 
  html_text()

experiment <- remDr$findElement(using = "link text", value = experiments[1])

experiment$clickElement()

Sys.sleep(1)

remDr$navigate("https://spellout.net/ibexfarm/ajax/download/workshop_DashedSentence/results/results")

experiment_results <- remDr$findElement(using = "tag", value = "pre")$getElementText()[[1]] %>% 
  stringr::str_split('\n') %>% 
  `[[`(1)

experiment_cols <- purrr::discard(stringr::str_extract(experiment_results, "(?<=^# \\d{1,2}\\. ).*(?=(\\.|\\?)$)"), is.na)

experiment_data <- purrr::discard(experiment_results, ~ stringr::str_detect(.x, "^#"))

results <- readr::read_csv(experiment_data, col_names = experiment_cols) %>% 
  janitor::clean_names()

results



invisible(remDr$closeall())

toc()



## Dynamic ver

# components_list <- c("chunk_includes" = 1L, "css_includes" = 2L, "data_includes" = 3L, "js_includes" = 4L, "results" = 5L, "server_state" = 6L)
# 
# select_component <- function(component) {
#   remDr$findElements(using = "class", value = "browseDir")[[components_list[component]]]
# }
# 
# component <- select_component("results")
# 
# select_file <- function(rD_component, row_num = 2L, click = "raw") {
#   component_links <- rD_component$findElements(using = "class", value = "writable")
#   Filter(function(x) x$getElementText() == click, component_links[[1]]$findChildElements(using = "class", value = "linklike"))[[row_num]]
# }
# 
# component_file <- select_file(component, 2L, 'edit')
# 
# component_file$clickElement()

