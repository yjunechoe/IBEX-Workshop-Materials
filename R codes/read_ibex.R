read_ibex <- function(results_file, external = TRUE, simplify = TRUE) {
  
  if (external) {
    raw_lines <- readLines(results_file, warn = FALSE)
  } else {
    raw_lines <- results_file
  }
  
  data_lines <- raw_lines[!grepl("^(#| )", raw_lines)]
  comments <- raw_lines[grepl("^(#| )", raw_lines)]
  col_specs <- comments[grepl("(Col\\. \\d+:|^# \\d+\\. )", comments)]
  
  col_groups <- list()
  for (i in 1L:length(col_specs)) {
    if (i == 1L) {
      col_groups[[1L]] <- col_specs[i]
    }
    else if (i == length(col_specs) | (i < length(col_specs) && !grepl("(Col\\. 1:|^# 1\\. )", col_specs[i]))) {
      col_groups[[length(col_groups)]] <- c(col_groups[[length(col_groups)]], col_specs[i])
    } else {
      col_groups[[length(col_groups) + 1L]] <- col_specs[i]
    }
  }
  
  col_groups <- lapply(unique(col_groups), function(x) gsub("(^# +Col\\. \\d+: |^# \\d+\\. |\\.$)", "", x))
  data_groups <- lapply(1L:length(col_groups), function(x) {
    data_lines[rep(1L:length(col_groups), length.out = length(data_lines)) == x]
  })
  
  results <- lapply(1L:length(data_groups), function(x) {
    data_group <- data.frame(matrix(unlist(strsplit(data_groups[[x]], ",")), nrow = length(data_groups[[x]]), byrow = TRUE))
    colnames(data_group) <- col_groups[[x]]
    data_group
  })
  
  if (length(results) == 1L) {
    results[[1L]]
  } else{
    if (simplify) {
      Reduce(function(left, right) {merge(left, right, by = 1:7)}, results)
    } else {
      results
    }
  }
  
}
