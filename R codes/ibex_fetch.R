library(dplyr)
library(rvest)
library(RSelenium)


#### Edit details here
USERNAME <- "skku_ibex"
PASSWORD <- "2021workshop"
EXPERIMENT <- "workshop_DashedSentence"
###


rD <- rsDriver(
  browser = "firefox", port = 2021L, verbose = F,
  extraCapabilities = list(
    "moz:firefoxOptions" = list(
      args = list('--headless')
    )
  ))
remDr <- rD[["client"]]

remDr$navigate("https://spellout.net/ibexfarm/login")

Sys.sleep(1)

remDr$findElement(using = "name", value = "username")$sendKeysToElement(list(USERNAME))
remDr$findElement(using = "name", value = "password")$sendKeysToElement(list(PASSWORD))
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

remDr$navigate(paste0("https://spellout.net/ibexfarm/ajax/download/", EXPERIMENT, "/results/results"))

experiment_results <- remDr$findElement(using = "tag", value = "pre")$getElementText()[[1]] %>% 
  stringr::str_split('\n') %>% 
  `[[`(1)

experiment_cols <- purrr::discard(stringr::str_extract(experiment_results, "(?<=^# \\d{1,2}\\. ).*(?=(\\.|\\?)$)"), is.na)

experiment_data <- purrr::discard(experiment_results, ~ stringr::str_detect(.x, "^#"))

results <- readr::read_csv(experiment_data, col_names = unique(experiment_cols))

invisible(remDr$closeall())

readr::write_csv(results, "results.csv")
