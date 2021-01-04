############# Edit details here #############
USERNAME <- "skku_ibex"
PASSWORD <- "2021workshop"
EXPERIMENT <- "workshop_DashedSentence"
RESULTS_FILENAME <- "results.csv"
#############################################


## Setup ##

library(dplyr)
library(rvest)
library(RSelenium)
source('R codes/read_ibex.R')


## Connect to IBEX and get results ##

rD <- rsDriver(
  browser = "firefox", port = as.integer(runif(1, 1001, 9999)), verbose = F,
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

message("Present experiments:\n", paste0(paste("-", experiments), collapse = "\n"))
message("Selected experiment:\n", paste("-", EXPERIMENT))

if (!EXPERIMENT %in% experiments) stop("Invalid experiment name. Please choose among present experiments.")

remDr$navigate(paste0("https://spellout.net/ibexfarm/ajax/download/", EXPERIMENT, "/results/results"))


## Process results file and save ##

raw_results <- remDr$findElement(using = "tag", value = "pre")$getElementText()[[1]]

invisible(remDr$closeall())

results <- read_ibex(strsplit(raw_results, "\n")[[1]], external = FALSE)

write.csv(results, RESULTS_FILENAME)
