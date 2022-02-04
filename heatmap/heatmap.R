library(tidyverse)
library(pheatmap)
library(RColorBrewer)
library(dplyr)

expression <- read_csv("df_expression_R.csv")
expression <- column_to_rownames(expression, var = "X1")
metadata <- read_csv("metadata_R.csv")
metadata['patient'] <- metadata['patient_id']
metadata <- column_to_rownames(metadata,var='patient')
metadata$type_of_breast_surgery <- factor(metadata$type_of_breast_surgery)
metadata$cancer_type_detailed <- factor(metadata$cancer_type_detailed)
metadata$`pam50_+_claudin-low_subtype` <- factor(metadata$`pam50_+_claudin-low_subtype`)
metadata$chemotherapy <- factor(metadata$chemotherapy)
levels(metadata$chemotherapy) <- c("No","Yes")
metadata$radio_therapy <- factor(metadata$radio_therapy)
levels(metadata$radio_therapy) <- c("No","Yes")
str(metadata)

type_of_breast_surgery <- c("#1D3557","#E63946")
names(type_of_breast_surgery) <- levels(metadata$type_of_breast_surgery)
`pam50_+_claudin-low_subtype` <- c("#d54265","#f47562","#ffc865", "#96bfac", "#9194b6", "#80607a","#808080")
names(`pam50_+_claudin-low_subtype`) <- levels(metadata$`pam50_+_claudin-low_subtype`)
chemotherapy <- c("#2A9D8F", "#F4A261")
names(chemotherapy) <- levels(metadata$chemotherapy)
radio_therapy <- c("#DDBEA9", "#A5A58D")
names(radio_therapy) <- levels(metadata$radio_therapy)
anno_colors <- list(type_of_breast_surgery = type_of_breast_surgery,
                    `pam50_+_claudin-low_subtype`=`pam50_+_claudin-low_subtype`,
                    chemotherapy = chemotherapy, radio_therapy = radio_therapy)


paletteLength <- 50
myBreaks <- c(seq(-5, 0, length.out=ceiling(paletteLength/2) + 1), 
              seq(max(expression)/paletteLength, 5, length.out=floor(paletteLength/2)))

Heatmap <- pheatmap(expression,
                    color=colorRampPalette(rev(brewer.pal(n = 11, name = "RdBu")))(paletteLength),
                    breaks = myBreaks,
                    cluster_rows=T, clustering_distance_rows = "correlation", 
                    cluster_cols = T,show_rownames=F,show_colnames = F,
                    clustering_method = "average",
                    annotation=select(metadata,type_of_breast_surgery,`pam50_+_claudin-low_subtype`,chemotherapy,radio_therapy),
                    annotation_colors = anno_colors)

Heatmap
