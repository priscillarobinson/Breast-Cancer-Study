# Machine Learning of Breast Cancer Study
## Breast cancer
- Most frequent cancer among women
- The greatest number of cancer-related deaths among women
- Clinical decision-making in patients with cancers
- Accurate estimation of prognosis and survival duration/outcome
- Machine learning techniques on genetic data

## Dataset
- 1904 breast cancer patients 
- 30 clinical attributes (not include patient id)
- m-RNA levels z-score for 489 genes
- mutation in 173 genes

## Data Source and Reference:
- https://www.kaggle.com/raghadalharbi/breast-cancer-gene-expression-profiles-metabric 
- https://www.nature.com/articles/s41523-018-0056-8
- https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5461908/
- https://www.cbioportal.org/study/summary?id=brca_metabric

<hr>

## Correlation Analysis and Feature Selection
[*CorrelationAnalysisAndFeatureSelection.ipynb*](Data/CorrelationAnalysisAndFeatureSelection.ipynb) <br>
**Target:**<br>
overall_survival <br>
overalll_survival_months

**Features:**<br>
age_at_diagnosis <br>
chemotherapy<br>
neoplasm_histologic_grade<br>
hormone_therapy<br>
lymph_nodes_examined_positive<br>
mutation_count <br>
radio_therapy<br>
tumor_size<br>
tumor_stage encoded_type_of_breast_surgery<br>
encoded_cancer_type_detailed encoded_cellularity<br>
encoded_pam50_+_claudin-low_subtype <br>
encoded_er_status<br>
encoded_her2_status<br>
encoded_tumor_other_histologic_subtype<br>
encoded_inferred_menopausal_state<br>
encoded_integrative_cluster<br>
encoded_pr_status<br>
<hr>

## Supervised Machine Learning
[*ML Models to Predict Survival Outcome*](Models/ML_Models.ipynb) <br>
**Goal: Predict Breast Cancer Survival Based on Clinincal Attributes**<br>
- We utilized 19 clinical attributes and 5 machine learning models to attempt to predict outcomes

**Models Utilized**<br>
Logistic Regression, Support Vector Classification, Random Forest Classifier, AdaBoost classifier, and XGBoost Classifier<br>
Random Forest Classifier had the strongest performance of predicting overall survival with an accuracy of 0.696

**Clinincal Attributes Used**<br>
age_at_diagnosis<br>
chemotherapy<br>
neoplasm_histologic_grade<br>
hormone_therapy<br>
lymph_nodes_examined_positive<br>
mutation_count<br>
radio_therapy<br>
tumor_size<br>
tumor_stage<br>
encoded_type_of_breast_surgery<br>
encoded_cancer_type_detailed<br>
encoded_cellularity<br>
encoded_pam50_+_claudin-low_subtype<br>
encoded_er_status<br>
encoded_her2_status<br>
encoded_tumor_other_histologic_subtype<br>
encoded_inferred_menopausal_state<br>
encoded_integrative_cluster<br>
encoded_pr_status<br>

[*ML Models to Predict Overall Survival Time*](Models/MultipleLinearRegression_OverallSurvivalMonthes.ipynb) <br>
**Goal: Predict Breast Cancer Survival Time Based on Clinincal Attributes**<br>
- We utilized 19 clinical attributes and multiple linear regression to attempt to predict survival time

**Models Utilized**<br>
Multiple Logistic Regression with R2 ~ 0.1693 <br>

Multiple Linear Regression prediction on the survival time is weak, with high error. <br>
However, the following features are the top 5 most important for predicting the survival outcome (based on the absolute values of the coefficients) :
- age_at_diagnosis
- encoded_tumor_other_histologic_subtype
- tumor_stage
- lymph_nodes_examined_positive
- encoded_cancer_type_detailed

<hr>

## Unsupervised Machine Learning
[*PCA_LDA_gene_expression.ipynb*](Data/PCA_LDA_gene_expression.ipynb) <br>
### Principal Component Analysis (PCA)
- Identify the combination of attributes (principal components, or directions in the feature space) that account for the most variance in the data. 
- Explained variance ratio (first two components): [0.07960216 0.06701992]
- The first two components did not explain the majority of gene expression variance among different subtypes of breast cancer patient samples.

### Linear Discriminant Analysis (LDA) 
- Identify attributes that account for the most variance between classes. 
- Note: This is a supervised method, using known class labels.
- The LDA is a better approach to separate differenct subtypes of breast cancer patient samples. 

[*heatmap.R*](heatmap/heatmap.R) <br>
### Hierarchical Clustering
- 489 Z-score mRNA levels of gene expression
- We would like to see if groups of patients share a common gene expression profile based on the clinical evaluation. 


