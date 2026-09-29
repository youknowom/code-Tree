import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  console.log("Seeding Production AI/ML Curriculum...");

  // Define Courses
  const aimlCourses = [
    {
      courseId: 9,
      title: "Python, NumPy & Data Science for AI",
      description: "Master foundational Python data structures, vectorized computing with NumPy, and high-performance tabular manipulation with Pandas for machine learning pipelines.",
      bannerImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      level: "Beginner",
      tags: "Python, NumPy, Pandas, Data Science",
      editorType: "python",
      category: "AI/ML",
      duration: "10 Hours",
      instructor: "Dr. Elena Vance, Senior AI Scientist",
      passingScore: 70,
      certificateEnabled: true,
      overview: {
        prerequisites: ["Basic programming familiarity in any language", "High-school algebra basics"],
        skillsCovered: ["Python for ML", "NumPy Vectorization", "Pandas DataFrames", "Data Cleaning", "Feature Matrix Preparation"],
        learningOutcomes: [
          "Transform raw datasets into clean numeric matrices ready for ML algorithms",
          "Execute vectorized tensor operations 50x faster than standard loops",
          "Handle missing values, categorical encoding, and outlier detection with Pandas",
          "Engineer features from real-world tabular data without data leakage"
        ],
        targetAudience: "Software engineers, analysts, and aspiring ML practitioners transitioning into Artificial Intelligence."
      }
    },
    {
      courseId: 10,
      title: "Machine Learning Fundamentals & Scikit-Learn",
      description: "Build, evaluate, and tune production-ready statistical learning models. Master regression, classification, clustering, cross-validation, and Scikit-Learn pipelines.",
      bannerImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      level: "Intermediate",
      tags: "Machine Learning, Scikit-Learn, Statistical Learning",
      editorType: "python",
      category: "AI/ML",
      duration: "14 Hours",
      instructor: "Marcus Thorne, Principal ML Engineer",
      passingScore: 75,
      certificateEnabled: true,
      overview: {
        prerequisites: ["Proficiency in Python and NumPy", "Understanding of linear algebra and basic derivatives"],
        skillsCovered: ["Linear & Logistic Regression", "Random Forests & Ensembles", "K-Means & PCA", "Cross-Validation", "Production Pipelines"],
        learningOutcomes: [
          "Formulate business problems into supervised classification or regression tasks",
          "Build robust validation strategies to detect and avoid overfitting and target leakage",
          "Implement Scikit-learn ColumnTransformers and Pipelines for seamless inference",
          "Optimize hyperparameters using GridSearchCV and evaluate with ROC-AUC, F1, and PR curves"
        ],
        targetAudience: "Developers looking to build practical predictive systems and understand the mathematical foundations of ML."
      }
    },
    {
      courseId: 11,
      title: "Deep Learning & Neural Networks with PyTorch",
      description: "Construct and train deep neural networks from the ground up using PyTorch. Learn autograd, multi-layer perceptrons, backpropagation, and convolutional networks for vision.",
      bannerImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      level: "Intermediate",
      tags: "Deep Learning, PyTorch, Neural Networks, Computer Vision",
      editorType: "python",
      category: "AI/ML",
      duration: "16 Hours",
      instructor: "Dr. Aris Thorne, Deep Learning Researcher",
      passingScore: 75,
      certificateEnabled: true,
      overview: {
        prerequisites: ["Strong Python skills", "Matrix operations & calculus foundations", "Machine learning basics"],
        skillsCovered: ["PyTorch Tensors & Autograd", "Custom nn.Module Architectures", "Backpropagation & Loss Functions", "CNNs & Vision Models", "Model Checkpointing"],
        learningOutcomes: [
          "Understand automatic differentiation and computational graphs in PyTorch",
          "Implement custom neural network modules, activation functions, and training loops",
          "Build Convolutional Neural Networks (CNNs) for image classification and feature extraction",
          "Apply regularization techniques like Dropout, Batch Normalization, and Weight Decay"
        ],
        targetAudience: "Engineers wanting to master modern deep learning frameworks and understand modern neural network architectures."
      }
    },
    {
      courseId: 12,
      title: "Generative AI, RAG & Autonomous LLM Agents",
      description: "Master modern Large Language Model systems. Build production Retrieval-Augmented Generation (RAG) pipelines, vector search engines, and multi-step autonomous AI agents.",
      bannerImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
      level: "Advanced",
      tags: "Generative AI, LLMs, RAG, Vector DBs, AI Agents",
      editorType: "python",
      category: "AI/ML",
      duration: "18 Hours",
      instructor: "Sarah Lin, Lead GenAI Architect",
      passingScore: 80,
      certificateEnabled: true,
      overview: {
        prerequisites: ["Experience with Python and API integration", "Understanding of embeddings and neural networks"],
        skillsCovered: ["Transformer Attention", "Vector Databases & HNSW", "Advanced RAG Pipelines", "ReAct Agent Loops", "Function & Tool Calling"],
        learningOutcomes: [
          "Deconstruct Transformer attention mechanisms and token generation dynamics",
          "Design enterprise RAG pipelines with semantic chunking, embeddings, and re-ranking",
          "Implement autonomous agents using the ReAct (Reason + Act) loop and schema tool calling",
          "Protect generative AI applications against prompt injections and hallucination risks"
        ],
        targetAudience: "Senior engineers and architects building enterprise AI products, copilot systems, and autonomous agent workflows."
      }
    }
  ];

  for (const c of aimlCourses) {
    await sql`
      INSERT INTO courses (
        course_id, title, description, banner_image, level, tags, editor_type,
        category, duration, instructor, passing_score, certificate_enabled, overview, status
      ) VALUES (
        ${c.courseId}, ${c.title}, ${c.description}, ${c.bannerImage}, ${c.level}, ${c.tags}, ${c.editorType},
        ${c.category}, ${c.duration}, ${c.instructor}, ${c.passingScore}, ${c.certificateEnabled}, ${JSON.stringify(c.overview)}, 'published'
      )
      ON CONFLICT (course_id) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        banner_image = EXCLUDED.banner_image,
        level = EXCLUDED.level,
        tags = EXCLUDED.tags,
        editor_type = EXCLUDED.editor_type,
        category = EXCLUDED.category,
        duration = EXCLUDED.duration,
        instructor = EXCLUDED.instructor,
        passing_score = EXCLUDED.passing_score,
        certificate_enabled = EXCLUDED.certificate_enabled,
        overview = EXCLUDED.overview,
        status = EXCLUDED.status;
    `;
    console.log(`✓ Seeded course: ${c.title} (ID: ${c.courseId})`);
  }

  // Seed Chapters & Lessons for Course 9 (Python & NumPy for AI)
  const c9Chapters = [
    {
      chapterId: 1,
      name: "Vectorized Computing with NumPy",
      description: "Learn how NumPy creates contiguous memory multidimensional arrays and replaces slow Python loops with high-speed SIMD vector instructions.",
      exercises: [
        {
          name: "NumPy Array Creation & Vectorization",
          slug: "numpy-array-vectorization",
          xp: 30,
          difficulty: "easy"
        },
        {
          name: "Array Reshaping & Matrix Operations",
          slug: "array-reshaping-matrix-ops",
          xp: 40,
          difficulty: "medium"
        }
      ]
    },
    {
      chapterId: 2,
      name: "Data Manipulation with Pandas",
      description: "Master Series and DataFrames, missing value imputation, and grouping aggregations for real-world tabular data.",
      exercises: [
        {
          name: "DataFrame Filtering & Transformations",
          slug: "dataframe-filtering-transforms",
          xp: 35,
          difficulty: "easy"
        },
        {
          name: "Feature Scaling & Matrix Normalization",
          slug: "feature-scaling-normalization",
          xp: 45,
          difficulty: "medium"
        }
      ]
    },
    {
      chapterId: 3,
      name: "Capston Project: ML Feature Engineering Pipeline",
      description: "Build an end-to-end data preparation pipeline that converts raw messy real estate data into cleaned feature matrices ready for regression models.",
      exercises: [
        {
          name: "Building the Housing Feature Pipeline",
          slug: "housing-feature-pipeline",
          xp: 60,
          difficulty: "hard"
        }
      ]
    }
  ];

  for (const ch of c9Chapters) {
    await sql`
      INSERT INTO course_chapters (course_id, chapter_id, name, description, exercises)
      VALUES (9, ${ch.chapterId}, ${ch.name}, ${ch.description}, ${JSON.stringify(ch.exercises)})
      ON CONFLICT (course_id, chapter_id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        exercises = EXCLUDED.exercises;
    `;
  }

  // Seed Detailed Content for Course 9 exercises
  const c9ExercisesContent = [
    {
      chapterId: 1,
      exerciseId: "numpy-array-vectorization",
      exerciseName: "NumPy Array Creation & Vectorization",
      content: {
        content: `
          <h2>Vectorized Computing in Modern AI</h2>
          <p>In standard Python, a list contains pointers to separate boxed objects. In contrast, a <strong>NumPy ndarray</strong> stores elements in a contiguous block of memory. This allows CPU vector units (SIMD — Single Instruction, Multiple Data) to execute arithmetic hundreds of times faster.</p>
          
          <h3>Why Vectorization Matters</h3>
          <p>Every Machine Learning algorithm from linear regression to 70B parameter transformers relies on matrix multiplications and dot products. Without vectorization, training even modest neural networks would take days instead of seconds.</p>

          <pre><code>import numpy as np

# Creating an array
arr = np.array([10, 20, 30, 40])

# Vectorized operation — no for-loop needed!
normalized = arr / 100.0
print("Normalized:", normalized)</code></pre>

          <h3>Broadcasting</h3>
          <p>Broadcasting allows NumPy to perform element-wise arithmetic on arrays of different shapes by conceptually replicating the smaller array along matching dimensions.</p>
        `,
        task: `Create a function <code>compute_l2_norm(vector)</code> that takes a 1D NumPy array or list, squares each element using vectorized operations, sums them, and returns the square root (the Euclidean L2 norm).`,
        hint: `You can use <code>np.sqrt(np.sum(vector ** 2))</code> or <code>np.linalg.norm(vector)</code>.`,
        startCode: `import numpy as np

def compute_l2_norm(vector):
    """
    Computes Euclidean L2 norm of a vector.
    Example: [3, 4] -> sqrt(3^2 + 4^2) = 5.0
    """
    arr = np.array(vector)
    # Write your vectorized calculation below:
    norm = np.sqrt(np.sum(arr ** 2))
    return float(norm)

# Test your function:
test_vec = [3.0, 4.0]
print("L2 Norm:", compute_l2_norm(test_vec))
`
      }
    },
    {
      chapterId: 1,
      exerciseId: "array-reshaping-matrix-ops",
      exerciseName: "Array Reshaping & Matrix Operations",
      content: {
        content: `
          <h2>Matrix Reshaping and Dot Products</h2>
          <p>When feeding data into AI models, tensor dimensionality must match the input weights matrix. A common operation is reshaping a 1D vector of shape <code>(N,)</code> into a column matrix <code>(N, 1)</code>.</p>

          <h3>Matrix Multiplication (Dot Product)</h3>
          <p>In Python 3.5+, the <code>@</code> operator denotes matrix multiplication, equivalent to <code>np.matmul(A, B)</code> or <code>A.dot(B)</code>.</p>
          <pre><code>X = np.array([[1, 2], [3, 4]])
W = np.array([[0.5], [1.5]])
# Output shape: (2, 1)
Y = X @ W</code></pre>
        `,
        task: `Given a dataset matrix <code>X</code> of shape (m, n) and a weight vector <code>w</code> of shape (n,), calculate the linear predictions <code>y_pred = X @ w</code> and return the mean prediction.`,
        hint: `Use <code>preds = X @ w</code> and <code>preds.mean()</code>.`,
        startCode: `import numpy as np

def linear_forward(X, w):
    """
    Computes linear predictions y = X @ w and returns mean prediction.
    """
    X_mat = np.array(X)
    w_vec = np.array(w)
    
    # Compute dot product and mean
    predictions = X_mat @ w_vec
    return float(predictions.mean())

# Test
X_sample = [[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]]
w_sample = [0.5, -0.2]
print("Mean Prediction:", linear_forward(X_sample, w_sample))
`
      }
    },
    {
      chapterId: 2,
      exerciseId: "dataframe-filtering-transforms",
      exerciseName: "DataFrame Filtering & Transformations",
      content: {
        content: `
          <h2>Tabular Data Wrangling with Pandas</h2>
          <p>Pandas is the workhorse of real-world machine learning data pipelines. Before any algorithm can learn, raw data must be filtered, normalized, and cleaned.</p>
          
          <h3>Boolean Indexing & Querying</h3>
          <p>You can filter rows based on conditions:</p>
          <pre><code>import pandas as pd
df = pd.DataFrame({
    'age': [25, 30, 45, 18, 55],
    'income': [50000, 65000, 110000, 22000, 130000]
})
high_earners = df[df['income'] > 60000]</code></pre>
        `,
        task: `Filter the dataframe to include only records where <code>experience_years &gt;= 3</code> and compute the average <code>salary</code>.`,
        hint: `Use <code>df[df['experience_years'] >= 3]['salary'].mean()</code>.`,
        startCode: `import pandas as pd

def average_experienced_salary(data):
    df = pd.DataFrame(data)
    # Filter experience_years >= 3 and return mean salary
    filtered = df[df['experience_years'] >= 3]
    return float(filtered['salary'].mean())

sample_data = {
    'name': ['Alice', 'Bob', 'Charlie', 'Dana'],
    'experience_years': [1, 4, 5, 2],
    'salary': [60000, 95000, 115000, 70000]
}
print("Avg Salary (3+ yrs):", average_experienced_salary(sample_data))
`
      }
    },
    {
      chapterId: 2,
      exerciseId: "feature-scaling-normalization",
      exerciseName: "Feature Scaling & Matrix Normalization",
      content: {
        content: `
          <h2>Min-Max Scaling & Z-score Standardization</h2>
          <p>Gradient-based optimizers and distance-based models (KNN, SVM, K-Means) are sensitive to feature scales. If one feature ranges from 0 to 1 and another from 0 to 1,000,000, the algorithm will be dominated by the larger feature.</p>

          <h3>Min-Max Formula:</h3>
          <p><code>X_norm = (X - X_min) / (X_max - X_min)</code></p>
          <p>This rescales all feature values to lie strictly within [0, 1].</p>
        `,
        task: `Implement <code>min_max_scale(values)</code> using NumPy to scale an input list of numbers between 0.0 and 1.0.`,
        hint: `Subtract <code>arr.min()</code> and divide by <code>(arr.max() - arr.min())</code>.`,
        startCode: `import numpy as np

def min_max_scale(values):
    arr = np.array(values, dtype=float)
    min_val = arr.min()
    max_val = arr.max()
    
    if max_val == min_val:
        return np.zeros_like(arr).tolist()
        
    scaled = (arr - min_val) / (max_val - min_val)
    return scaled.tolist()

print("Scaled:", min_max_scale([10, 20, 30, 40, 50]))
`
      }
    },
    {
      chapterId: 3,
      exerciseId: "housing-feature-pipeline",
      exerciseName: "Building the Housing Feature Pipeline",
      content: {
        content: `
          <h2>Capstone: Production Feature Engineering Pipeline</h2>
          <p>In this project, you construct a complete feature engineering transformation for a housing dataset. You must handle missing values, log-transform skewed features (such as price or square footage), and compute derived features like <code>price_per_sqft</code>.</p>
          
          <h3>Why Feature Engineering Decides Model Performance</h3>
          <p>Top Kaggle grandmasters and production ML teams know: better features beat complex algorithms. Clean, well-engineered tabular signals allow simple models to generalize cleanly without overfitting.</p>
        `,
        task: `Write a pipeline function <code>engineer_features(raw_data)</code> that imputes missing <code>bedrooms</code> with the median, creates <code>price_per_sqft = price / sqft</code>, and returns the processed DataFrame.`,
        hint: `Use <code>df['bedrooms'].fillna(df['bedrooms'].median(), inplace=True)</code> and <code>df['price_per_sqft'] = df['price'] / df['sqft']</code>.`,
        startCode: `import pandas as pd
import numpy as np

def engineer_features(data):
    df = pd.DataFrame(data)
    
    # 1. Fill missing bedrooms with median
    median_beds = df['bedrooms'].median()
    df['bedrooms'] = df['bedrooms'].fillna(median_beds)
    
    # 2. Engineer price_per_sqft
    df['price_per_sqft'] = (df['price'] / df['sqft']).round(2)
    
    return df

raw_houses = {
    'sqft': [1200, 1800, 850, 2400],
    'bedrooms': [2, np.nan, 1, 4],
    'price': [300000, 450000, 220000, 680000]
}
processed = engineer_features(raw_houses)
print(processed)
`
      }
    }
  ];

  for (const ex of c9ExercisesContent) {
    await sql`
      INSERT INTO exercises (course_id, chapter_id, exercise_id, exercise_name, exercises_content)
      VALUES (9, ${ex.chapterId}, ${ex.exerciseId}, ${ex.exerciseName}, ${JSON.stringify(ex.content)})
      ON CONFLICT DO NOTHING;
    `;
  }

  // Seed Chapters & Content for Course 10: Machine Learning Fundamentals & Scikit-Learn
  const c10Chapters = [
    {
      chapterId: 1,
      name: "Supervised Learning: Regression & Regularization",
      description: "Understand Ordinary Least Squares, cost functions (MSE), and regularization with Ridge (L2) and Lasso (L1) to prevent overfitting.",
      exercises: [
        {
          name: "Linear Regression & Gradient Descent Concept",
          slug: "linear-regression-gradient-descent",
          xp: 40,
          difficulty: "easy"
        },
        {
          name: "Ridge vs Lasso Regularization",
          slug: "ridge-lasso-regularization",
          xp: 45,
          difficulty: "medium"
        }
      ]
    },
    {
      chapterId: 2,
      name: "Classification & Evaluation Metrics",
      description: "Build logistic regression and decision forest classifiers. Evaluate with Confusion Matrix, Precision, Recall, and ROC-AUC.",
      exercises: [
        {
          name: "Logistic Regression & Decision Boundaries",
          slug: "logistic-regression-decision-boundaries",
          xp: 45,
          difficulty: "medium"
        },
        {
          name: "Confusion Matrix, Precision & Recall",
          slug: "confusion-matrix-precision-recall",
          xp: 50,
          difficulty: "medium"
        }
      ]
    },
    {
      chapterId: 3,
      name: "Production Scikit-Learn Pipeline Capstone",
      description: "Build an end-to-end model pipeline with ColumnTransformer, StandardScaler, and Cross-Validation to predict customer churn.",
      exercises: [
        {
          name: "Customer Churn Prediction Pipeline",
          slug: "customer-churn-prediction-pipeline",
          xp: 75,
          difficulty: "hard"
        }
      ]
    }
  ];

  for (const ch of c10Chapters) {
    await sql`
      INSERT INTO course_chapters (course_id, chapter_id, name, description, exercises)
      VALUES (10, ${ch.chapterId}, ${ch.name}, ${ch.description}, ${JSON.stringify(ch.exercises)})
      ON CONFLICT (course_id, chapter_id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        exercises = EXCLUDED.exercises;
    `;
  }

  const c10ExercisesContent = [
    {
      chapterId: 1,
      exerciseId: "linear-regression-gradient-descent",
      exerciseName: "Linear Regression & Cost Function",
      content: {
        content: `
          <h2>The Foundations of Supervised Learning</h2>
          <p>Linear Regression models the relationship between independent feature vector <strong>X</strong> and continuous target <strong>y</strong> using the hypothesis:</p>
          <p><code>y_hat = w · X + b</code></p>
          
          <h3>Mean Squared Error (MSE)</h3>
          <p>We evaluate error using the Mean Squared Error loss function:</p>
          <p><code>MSE = (1 / N) * Σ (y_i - y_hat_i)^2</code></p>
          <p>Optimization minimizes this convex surface with respect to weights <code>w</code> and bias <code>b</code>.</p>
        `,
        task: `Implement <code>calculate_mse(y_true, y_pred)</code> using NumPy to compute the mean squared error between ground truth and predictions.`,
        hint: `Compute <code>np.mean((np.array(y_true) - np.array(y_pred)) ** 2)</code>.`,
        startCode: `import numpy as np

def calculate_mse(y_true, y_pred):
    yt = np.array(y_true, dtype=float)
    yp = np.array(y_pred, dtype=float)
    
    # Calculate Mean Squared Error
    error = np.mean((yt - yp) ** 2)
    return float(error)

y_actual = [10.0, 20.0, 30.0, 40.0]
y_predicted = [12.0, 19.0, 28.0, 42.0]
print("MSE:", calculate_mse(y_actual, y_predicted))
`
      }
    },
    {
      chapterId: 1,
      exerciseId: "ridge-lasso-regularization",
      exerciseName: "Ridge vs Lasso Regularization",
      content: {
        content: `
          <h2>Controlling Overfitting with Regularization</h2>
          <p>When models have many collinear features, weights can explode to huge values, fitting training noise. Regularization adds a penalty term to the loss function:</p>
          
          <ul>
            <li><strong>Ridge (L2 Regularization):</strong> Adds <code>λ * Σ w_i^2</code>. Shrinks coefficients smoothly towards zero, retaining all features.</li>
            <li><strong>Lasso (L1 Regularization):</strong> Adds <code>λ * Σ |w_i|</code>. Encourages exact sparsity, effectively acting as an automated feature selector!</li>
          </ul>
        `,
        task: `Write a helper <code>ridge_penalty(weights, alpha)</code> that calculates the L2 penalty term <code>alpha * sum(w**2)</code>.`,
        hint: `Use <code>alpha * np.sum(np.array(weights) ** 2)</code>.`,
        startCode: `import numpy as np

def ridge_penalty(weights, alpha):
    w = np.array(weights, dtype=float)
    penalty = alpha * np.sum(w ** 2)
    return float(penalty)

print("L2 Penalty:", ridge_penalty([1.5, -2.0, 0.5], alpha=0.1))
`
      }
    },
    {
      chapterId: 2,
      exerciseId: "logistic-regression-decision-boundaries",
      exerciseName: "Logistic Regression & Sigmoid Function",
      content: {
        content: `
          <h2>From Linear Combinations to Probabilities</h2>
          <p>Logistic Regression predicts the probability of a binary outcome (e.g. churn vs retain, spam vs ham). It wraps the linear model output in the <strong>Sigmoid function (σ)</strong>:</p>
          <p><code>σ(z) = 1 / (1 + e^(-z))</code></p>
          <p>The output is strictly bounded between 0 and 1, representing <code>P(y = 1 | X)</code>.</p>
        `,
        task: `Implement the <code>sigmoid(z)</code> function using <code>np.exp</code> and evaluate it for given logits.`,
        hint: `Return <code>1.0 / (1.0 + np.exp(-z))</code>.`,
        startCode: `import numpy as np

def sigmoid(z):
    z_arr = np.array(z, dtype=float)
    # Sigmoid formula:
    return 1.0 / (1.0 + np.exp(-z_arr))

logits = [-2.0, 0.0, 2.0]
print("Probabilities:", sigmoid(logits))
`
      }
    },
    {
      chapterId: 2,
      exerciseId: "confusion-matrix-precision-recall",
      exerciseName: "Confusion Matrix, Precision & Recall",
      content: {
        content: `
          <h2>Beyond Accuracy: Production Evaluation Metrics</h2>
          <p>In imbalanced datasets (e.g., fraud detection where 99.9% of transactions are legitimate), a dummy classifier that always predicts "Not Fraud" achieves 99.9% accuracy while being completely useless.</p>

          <h3>Crucial Metrics:</h3>
          <ul>
            <li><strong>Precision:</strong> <code>TP / (TP + FP)</code> — Out of all predicted positives, how many were actually positive? (Minimizes false alarms)</li>
            <li><strong>Recall (Sensitivity):</strong> <code>TP / (TP + FN)</code> — Out of all actual positives, how many did we capture? (Minimizes missed detections)</li>
            <li><strong>F1 Score:</strong> Harmonic mean of Precision and Recall.</li>
          </ul>
        `,
        task: `Given counts of True Positives (TP), False Positives (FP), and False Negatives (FN), calculate Precision, Recall, and the F1 Score.`,
        hint: `Precision = TP / (TP + FP), Recall = TP / (TP + FN), F1 = 2 * (P * R) / (P + R).`,
        startCode: `def evaluate_classification(tp, fp, fn):
    precision = tp / (tp + fp) if (tp + fp) > 0 else 0.0
    recall = tp / (tp + fn) if (tp + fn) > 0 else 0.0
    f1 = 2 * (precision * recall) / (precision + recall) if (precision + recall) > 0 else 0.0
    
    return {
        "precision": round(precision, 4),
        "recall": round(recall, 4),
        "f1": round(f1, 4)
    }

print("Evaluation:", evaluate_classification(tp=80, fp=20, fn=10))
`
      }
    },
    {
      chapterId: 3,
      exerciseId: "customer-churn-prediction-pipeline",
      exerciseName: "Customer Churn Prediction Pipeline",
      content: {
        content: `
          <h2>Production Machine Learning Capstone</h2>
          <p>In this capstone, you formulate a complete prediction workflow for customer churn. You simulate feature preprocessing, scaling numeric columns, encoding categorical attributes, and returning probability thresholds for decision making.</p>
        `,
        task: `Write a decision helper <code>predict_churn(prob, threshold=0.6)</code> that flags a customer for retention intervention if their churn probability exceeds the threshold.`,
        hint: `Return <code>[p >= threshold for p in prob]</code>.`,
        startCode: `def predict_churn(probabilities, threshold=0.6):
    """
    Decides whether to trigger customer retention intervention.
    """
    decisions = [bool(p >= threshold) for p in probabilities]
    return decisions

sample_probs = [0.25, 0.62, 0.81, 0.45]
print("Intervention Needed:", predict_churn(sample_probs, threshold=0.6))
`
      }
    }
  ];

  for (const ex of c10ExercisesContent) {
    await sql`
      INSERT INTO exercises (course_id, chapter_id, exercise_id, exercise_name, exercises_content)
      VALUES (10, ${ex.chapterId}, ${ex.exerciseId}, ${ex.exerciseName}, ${JSON.stringify(ex.content)})
      ON CONFLICT DO NOTHING;
    `;
  }

  // Seed Chapters & Content for Course 11: Deep Learning & PyTorch
  const c11Chapters = [
    {
      chapterId: 1,
      name: "Tensors & Computational Graphs in PyTorch",
      description: "Master PyTorch tensors, autograd, and backward automatic differentiation.",
      exercises: [
        {
          name: "PyTorch Tensors & Autograd",
          slug: "pytorch-tensors-autograd",
          xp: 45,
          difficulty: "medium"
        }
      ]
    },
    {
      chapterId: 2,
      name: "Building Neural Networks with nn.Module",
      description: "Design custom multi-layer perceptrons, forward passes, activation functions, and training loops.",
      exercises: [
        {
          name: "MLP Architecture & Forward Pass",
          slug: "mlp-architecture-forward-pass",
          xp: 55,
          difficulty: "medium"
        },
        {
          name: "Convolutional Layers & Feature Maps",
          slug: "conv-layers-feature-maps",
          xp: 65,
          difficulty: "hard"
        }
      ]
    }
  ];

  for (const ch of c11Chapters) {
    await sql`
      INSERT INTO course_chapters (course_id, chapter_id, name, description, exercises)
      VALUES (11, ${ch.chapterId}, ${ch.name}, ${ch.description}, ${JSON.stringify(ch.exercises)})
      ON CONFLICT (course_id, chapter_id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        exercises = EXCLUDED.exercises;
    `;
  }

  const c11ExercisesContent = [
    {
      chapterId: 1,
      exerciseId: "pytorch-tensors-autograd",
      exerciseName: "PyTorch Tensors & Autograd",
      content: {
        content: `
          <h2>Dynamic Computational Graphs & Autograd</h2>
          <p>PyTorch uses define-by-run dynamic computation graphs. Every operation on a tensor with <code>requires_grad=True</code> builds a DAG (Directed Acyclic Graph) of operations, allowing exact gradient backpropagation with a single call to <code>.backward()</code>.</p>
        `,
        task: `Simulate gradient accumulation: Given function <code>y = 3*x^2 + 2*x + 1</code>, compute the analytical derivative <code>dy/dx = 6*x + 2</code> at <code>x = 4</code>.`,
        hint: `6 * 4 + 2 = 26.`,
        startCode: `def analytical_derivative_at(x):
    """
    Computes dy/dx for y = 3x^2 + 2x + 1
    dy/dx = 6x + 2
    """
    grad = 6 * x + 2
    return float(grad)

print("Gradient at x=4.0:", analytical_derivative_at(4.0))
`
      }
    },
    {
      chapterId: 2,
      exerciseId: "mlp-architecture-forward-pass",
      exerciseName: "MLP Architecture & Forward Pass",
      content: {
        content: `
          <h2>Multi-Layer Perceptrons & Activation Functions</h2>
          <p>Without non-linear activations (like ReLU, GELU, or SiLU), a deep network of any depth collapses mathematically into a single linear matrix multiplication. <strong>ReLU (Rectified Linear Unit)</strong>: <code>max(0, x)</code> provides non-linearity while preventing vanishing gradients.</p>
        `,
        task: `Implement the <code>relu(x)</code> activation function and test it on negative and positive values.`,
        hint: `Use <code>max(0.0, val)</code>.`,
        startCode: `def relu(x):
    return [max(0.0, float(val)) for val in x]

print("ReLU applied:", relu([-3.5, 0.0, 2.1, -0.4, 7.8]))
`
      }
    },
    {
      chapterId: 2,
      exerciseId: "conv-layers-feature-maps",
      exerciseName: "Convolutional Layers & Feature Maps",
      content: {
        content: `
          <h2>Spatial Invariance with 2D Convolutions</h2>
          <p>Convolutional Neural Networks (CNNs) slide a small kernel (e.g. 3x3 filter) across an image tensor. This exploits translation invariance and spatial locality, detecting edges, textures, and complex objects regardless of where they appear in the frame.</p>
        `,
        task: `Compute output spatial dimensions of a Conv2D layer: <code>Output = floor((Input - Kernel + 2*Padding) / Stride) + 1</code>.`,
        hint: `Use integer division: <code>(input_size - kernel_size + 2 * padding) // stride + 1</code>.`,
        startCode: `import math

def calculate_conv_output_dim(input_size, kernel_size=3, padding=1, stride=1):
    output_dim = math.floor((input_size - kernel_size + 2 * padding) / stride) + 1
    return int(output_dim)

print("Conv output for 224x224 image:", calculate_conv_output_dim(224, 3, 1, 1))
`
      }
    }
  ];

  for (const ex of c11ExercisesContent) {
    await sql`
      INSERT INTO exercises (course_id, chapter_id, exercise_id, exercise_name, exercises_content)
      VALUES (11, ${ex.chapterId}, ${ex.exerciseId}, ${ex.exerciseName}, ${JSON.stringify(ex.content)})
      ON CONFLICT DO NOTHING;
    `;
  }

  // Seed Chapters & Content for Course 12: Generative AI, RAG & Autonomous LLM Agents
  const c12Chapters = [
    {
      chapterId: 1,
      name: "Transformer Attention & Embeddings",
      description: "Understand Scaled Dot-Product Attention, Query-Key-Value matrices, and dense vector embeddings.",
      exercises: [
        {
          name: "Scaled Dot-Product Attention Mechanism",
          slug: "scaled-dot-product-attention",
          xp: 60,
          difficulty: "hard"
        },
        {
          name: "Cosine Similarity for Vector Search",
          slug: "cosine-similarity-vector-search",
          xp: 50,
          difficulty: "medium"
        }
      ]
    },
    {
      chapterId: 2,
      name: "Production RAG Architecture",
      description: "Implement document chunking, semantic retrieval, and context injection into system prompts.",
      exercises: [
        {
          name: "Chunking & RAG Context Assembly",
          slug: "chunking-rag-context-assembly",
          xp: 55,
          difficulty: "medium"
        }
      ]
    },
    {
      chapterId: 3,
      name: "Autonomous AI Agents & Tool Execution",
      description: "Implement the ReAct loop (Reason + Act) and structured tool invocation for LLM agents.",
      exercises: [
        {
          name: "ReAct Agent Decision Loop",
          slug: "react-agent-decision-loop",
          xp: 80,
          difficulty: "hard"
        }
      ]
    }
  ];

  for (const ch of c12Chapters) {
    await sql`
      INSERT INTO course_chapters (course_id, chapter_id, name, description, exercises)
      VALUES (12, ${ch.chapterId}, ${ch.name}, ${ch.description}, ${JSON.stringify(ch.exercises)})
      ON CONFLICT (course_id, chapter_id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        exercises = EXCLUDED.exercises;
    `;
  }

  const c12ExercisesContent = [
    {
      chapterId: 1,
      exerciseId: "scaled-dot-product-attention",
      exerciseName: "Scaled Dot-Product Attention Mechanism",
      content: {
        content: `
          <h2>The Mathematical Engine of Modern LLMs</h2>
          <p>The core of every Transformer (GPT-4, Claude, LLaMA) is the <strong>Scaled Dot-Product Attention</strong> formula:</p>
          <p><code>Attention(Q, K, V) = softmax((Q @ K.T) / sqrt(d_k)) @ V</code></p>
          <p>Dividing by <code>sqrt(d_k)</code> prevents dot products from growing excessively large in high dimensions, which would push softmax into regions with vanishing gradients.</p>
        `,
        task: `Write a function <code>compute_attention_scale(d_k)</code> that returns <code>1.0 / sqrt(d_k)</code>.`,
        hint: `Use <code>1.0 / (d_k ** 0.5)</code>.`,
        startCode: `import math

def compute_attention_scale(d_k):
    """
    Returns scaling factor 1 / sqrt(d_k) used in attention.
    """
    return 1.0 / math.sqrt(d_k)

print("Scale factor for d_k=64:", compute_attention_scale(64))
`
      }
    },
    {
      chapterId: 1,
      exerciseId: "cosine-similarity-vector-search",
      exerciseName: "Cosine Similarity for Vector Search",
      content: {
        content: `
          <h2>Semantic Similarity in High Dimensions</h2>
          <p>Vector databases (Pinecone, Chroma, Qdrant, Milvus) match query embeddings to document chunks using <strong>Cosine Similarity</strong>:</p>
          <p><code>cos_sim = (A · B) / (||A|| * ||B||)</code></p>
          <p>This measures the angular difference between two vectors regardless of their magnitude.</p>
        `,
        task: `Calculate cosine similarity between two numeric vectors <code>vec1</code> and <code>vec2</code>.`,
        hint: `Dot product divided by the product of their L2 norms.`,
        startCode: `import numpy as np

def cosine_similarity(vec1, vec2):
    v1 = np.array(vec1, dtype=float)
    v2 = np.array(vec2, dtype=float)
    
    dot = np.dot(v1, v2)
    norm1 = np.linalg.norm(v1)
    norm2 = np.linalg.norm(v2)
    
    if norm1 == 0 or norm2 == 0:
        return 0.0
        
    return float(dot / (norm1 * norm2))

print("Similarity:", cosine_similarity([1, 0, 1], [0.8, 0.1, 0.9]))
`
      }
    },
    {
      chapterId: 2,
      exerciseId: "chunking-rag-context-assembly",
      exerciseName: "Chunking & RAG Context Assembly",
      content: {
        content: `
          <h2>Retrieval-Augmented Generation (RAG)</h2>
          <p>LLMs have knowledge cutoff dates and suffer from hallucinations on proprietary documents. RAG solves this by retrieving relevant text chunks from a vector database and injecting them directly into the context window as grounded facts.</p>
        `,
        task: `Write a prompt assembly function <code>build_rag_prompt(query, retrieved_chunks)</code> that combines chunks into a structured system prompt.`,
        hint: `Join chunks with newlines and format into prompt.`,
        startCode: `def build_rag_prompt(query, retrieved_chunks):
    context = "\\n---\\n".join(retrieved_chunks)
    prompt = f"""You are a helpful AI assistant. Answer the user query strictly using the verified context below.

[CONTEXT]
{context}

[USER QUESTION]
{query}

[ANSWER]:"""
    return prompt

chunks = [
    "CodeTree AI platform was founded in 2026 to deliver hands-on ML engineering education.",
    "Certificates issued by CodeTree are cryptographically verified and tamper-proof."
]
print(build_rag_prompt("When was CodeTree founded?", chunks))
`
      }
    },
    {
      chapterId: 3,
      exerciseId: "react-agent-decision-loop",
      exerciseName: "ReAct Agent Decision Loop",
      content: {
        content: `
          <h2>Autonomous Agents: Reasoning + Acting</h2>
          <p>The <strong>ReAct</strong> pattern alternates between Thought, Action, and Observation:</p>
          <pre><code>Thought: I need to check current server latency.
Action: execute_tool("get_server_health", {"cluster": "us-east"})
Observation: {"latency_ms": 42, "status": "healthy"}
Thought: The cluster is healthy. I can report this to the user.
Final Answer: The us-east cluster is running optimally at 42ms latency.</code></pre>
        `,
        task: `Write an agent dispatcher <code>execute_agent_action(action_name, params)</code> that routes tool calls to registered handlers.`,
        hint: `Dispatch based on action_name.`,
        startCode: `def execute_agent_action(action_name, params):
    tools = {
        "calculator": lambda p: p.get("a", 0) + p.get("b", 0),
        "search_db": lambda p: f"Found 3 results for '{p.get('query')}'",
        "verify_cert": lambda p: f"Certificate {p.get('id')} is VALID"
    }
    
    if action_name in tools:
        return {"status": "success", "result": tools[action_name](params)}
    return {"status": "error", "message": f"Unknown tool: {action_name}"}

print(execute_agent_action("calculator", {"a": 40, "b": 2}))
print(execute_agent_action("verify_cert", {"id": "CERT-AIML-2026-9A7B3C"}))
`
      }
    }
  ];

  for (const ex of c12ExercisesContent) {
    await sql`
      INSERT INTO exercises (course_id, chapter_id, exercise_id, exercise_name, exercises_content)
      VALUES (12, ${ex.chapterId}, ${ex.exerciseId}, ${ex.exerciseName}, ${JSON.stringify(ex.content)})
      ON CONFLICT DO NOTHING;
    `;
  }

  // -------------------------------------------------------------
  // SEED FINAL CERTIFICATION ASSESSMENTS FOR ALL COURSES (9, 10, 11, 12)
  // -------------------------------------------------------------
  console.log("Seeding Final Certification Assessments...");

  const assessments = [
    {
      courseId: 9,
      assessmentType: "final",
      title: "Python, NumPy & Data Science Certification Exam",
      description: "Demonstrate mastery of vectorized computing, array broadcasting, memory layout, Pandas data cleaning, and feature matrix preparation.",
      passingScore: 70,
      timeLimitMinutes: 30,
      questions: [
        {
          id: 1,
          question: "Why are NumPy ndarrays significantly faster than native Python lists for numerical computations?",
          options: [
            "NumPy runs in a separate background thread automatically",
            "NumPy arrays store homogeneous data in contiguous memory blocks, enabling CPU SIMD vectorization",
            "NumPy compiles Python code into Java bytecode at runtime",
            "Python lists cannot store floating-point numbers"
          ],
          correctAnswerIndex: 1,
          explanation: "NumPy arrays store elements contiguously in memory with uniform C data types, avoiding pointer indirection and allowing CPU vector instructions (SIMD) to execute operations across multiple data points in a single clock cycle."
        },
        {
          id: 2,
          question: "What will be the shape of array C when broadcasting A with shape (3, 1) and B with shape (1, 4)?",
          options: [
            "(3, 4)",
            "(3, 1)",
            "(1, 4)",
            "Error: Operands cannot be broadcast together"
          ],
          correctAnswerIndex: 0,
          explanation: "Under NumPy broadcasting rules, dimensions with size 1 are expanded to match the other array's dimension. Here, 3 matches 1 -> 3, and 1 matches 4 -> 4, resulting in shape (3, 4)."
        },
        {
          id: 3,
          question: "Which Pandas operation should you use to handle missing numerical values in a feature column without introducing lookahead bias?",
          options: [
            "Impute with the mean computed strictly over the training split",
            "Impute with the mean computed over the entire combined dataset (train + test)",
            "Always drop all rows with missing values regardless of sample size",
            "Replace all missing values with 0 unconditionally"
          ],
          correctAnswerIndex: 0,
          explanation: "To prevent data leakage, summary statistics (mean, median, standard deviation) must be calculated strictly from the training set and then applied to test/validation sets."
        },
        {
          id: 4,
          question: "What is the primary risk of not scaling features before running distance-based algorithms like K-Means or KNN?",
          options: [
            "The model will throw a matrix determinant error",
            "Features with large numeric ranges will completely dominate the Euclidean distance calculation",
            "The learning rate will diverge to infinity",
            "The categorical variables will be converted to nulls"
          ],
          correctAnswerIndex: 1,
          explanation: "In distance calculations (d = sqrt(sum((x1 - x2)^2))), a feature ranging from 0-1,000,000 will overshadow a feature ranging from 0-1 by a factor of a million unless normalized."
        },
        {
          id: 5,
          question: "In Python, which matrix multiplication operator was introduced in Python 3.5 for NumPy arrays?",
          options: [
            "*",
            "&",
            "@",
            "**"
          ],
          correctAnswerIndex: 2,
          explanation: "The '@' operator performs matrix multiplication (np.matmul), whereas '*' performs element-wise multiplication."
        }
      ]
    },
    {
      courseId: 10,
      assessmentType: "final",
      title: "Machine Learning Fundamentals & Scikit-Learn Certification Exam",
      description: "Comprehensive assessment evaluating statistical learning concepts, bias-variance tradeoff, regularization, and model evaluation metrics.",
      passingScore: 75,
      timeLimitMinutes: 35,
      questions: [
        {
          id: 1,
          question: "A model has near-zero training error but substantially higher validation error. What is this condition, and what is an effective remedy?",
          options: [
            "High bias (underfitting); increase model complexity",
            "High variance (overfitting); apply L1/L2 regularization or gather more training data",
            "Data leakage; remove cross-validation splits",
            "Gradient explosion; increase the learning rate"
          ],
          correctAnswerIndex: 1,
          explanation: "When training error is low and validation error is high, the model has memorized training noise (overfitting/high variance). Regularization (L1/L2), pruning, or adding training samples constrains hypothesis complexity."
        },
        {
          id: 2,
          question: "How does L1 regularization (Lasso) differ fundamentally from L2 regularization (Ridge)?",
          options: [
            "L1 squares the weights; L2 takes the square root",
            "L1 drives less important feature weights to exactly zero, producing sparse models, while L2 shrinks weights asymptotically towards zero",
            "L2 works only on classification; L1 works only on regression",
            "L1 cannot be used with gradient descent"
          ],
          correctAnswerIndex: 1,
          explanation: "Because of the sharp geometry of the L1 diamond constraint boundary, optimal points frequently touch the axes, setting non-informative feature weights to exact zero."
        },
        {
          id: 3,
          question: "In a medical diagnosis task where failing to detect a life-threatening disease is catastrophic, which metric should be prioritized?",
          options: [
            "Precision",
            "Accuracy",
            "Recall (Sensitivity)",
            "Specificity"
          ],
          correctAnswerIndex: 2,
          explanation: "Recall measures TP / (TP + FN). High recall minimizes False Negatives (missed sick patients), ensuring anyone who might have the disease is flagged for further screening."
        },
        {
          id: 4,
          question: "What is the key advantage of K-Fold Cross-Validation over a single train/test split?",
          options: [
            "It eliminates the need for test data completely",
            "It evaluates model stability across multiple non-overlapping validation folds, reducing variance in performance estimates",
            "It speeds up model training by a factor of K",
            "It automatically optimizes neural network hyperparameters"
          ],
          correctAnswerIndex: 1,
          explanation: "K-fold cross-validation ensures every data point is used for validation exactly once, giving a much more reliable estimate of how the model generalizes."
        },
        {
          id: 5,
          question: "Why should fit_transform() be used on the training set, but only transform() on the test set in Scikit-Learn?",
          options: [
            "fit_transform is slower and should only be run once for performance reasons",
            "Calling fit() on the test set causes data leakage by using test distribution statistics during preprocessing",
            "Scikit-learn raises a syntax error if fit_transform is called twice",
            "The test set does not support matrix operations"
          ],
          correctAnswerIndex: 1,
          explanation: "Fitting transformers on test data exposes the model to test distribution parameters (mean, variance, min/max), constituting data leakage."
        }
      ]
    },
    {
      courseId: 11,
      assessmentType: "final",
      title: "Deep Learning & PyTorch Certification Exam",
      description: "Rigorous test covering computational graphs, loss functions, activation functions, backpropagation mechanics, and convolutional vision layers.",
      passingScore: 75,
      timeLimitMinutes: 40,
      questions: [
        {
          id: 1,
          question: "Why is optimizer.zero_grad() required before loss.backward() in a PyTorch training loop?",
          options: [
            "PyTorch resets weights to random initialization if zero_grad is omitted",
            "PyTorch accumulates gradients by default; omitting zero_grad causes gradients from previous batches to sum up",
            "It clears GPU memory cache to prevent Out-Of-Memory (OOM) errors",
            "It turns off dropout during the forward pass"
          ],
          correctAnswerIndex: 1,
          explanation: "PyTorch gradients accumulate into .grad attributes by design (useful for RNNs or gradient accumulation across mini-batches). Without zero_grad(), past gradients compound inappropriately."
        },
        {
          id: 2,
          question: "What problem occurs when training deep neural networks with Sigmoid or Tanh activations across many layers?",
          options: [
            "Exploding activations in the first layer",
            "Vanishing gradient problem, as gradients in saturated regions approach zero",
            "Matrix non-invertibility",
            "Loss divergence to negative infinity"
          ],
          correctAnswerIndex: 1,
          explanation: "The derivative of Sigmoid peaks at 0.25 and approaches 0 for large positive or negative inputs. In deep chains, multiplying many numbers < 0.25 drives gradients in early layers to near-zero."
        },
        {
          id: 3,
          question: "What is the primary role of a MaxPool2d layer in a Convolutional Neural Network?",
          options: [
            "It adds learnable weights to increase model capacity",
            "It reduces spatial dimensions of feature maps, providing translation invariance and cutting computational cost",
            "It normalizes activations to zero mean and unit variance",
            "It applies a non-linear threshold to negative pixels"
          ],
          correctAnswerIndex: 1,
          explanation: "Max pooling downsamples spatial dimensions (H, W) by selecting the maximum activation in each window, conferring translational robustness and reducing parameter count."
        },
        {
          id: 4,
          question: "Which loss function should be paired with a multi-class classification output layer in PyTorch?",
          options: [
            "nn.MSELoss",
            "nn.CrossEntropyLoss (which incorporates LogSoftmax internally)",
            "nn.BCEWithLogitsLoss",
            "nn.L1Loss"
          ],
          correctAnswerIndex: 1,
          explanation: "PyTorch's nn.CrossEntropyLoss combines LogSoftmax and NLLLoss in a single numerically stable implementation, taking raw unnormalized logits."
        },
        {
          id: 5,
          question: "What does model.eval() do in PyTorch before running evaluation or inference?",
          options: [
            "It disables gradient calculation permanently",
            "It switches layers like Dropout and BatchNorm into deterministic evaluation mode",
            "It compiles the PyTorch model to TensorRT",
            "It moves model tensors from CPU to GPU"
          ],
          correctAnswerIndex: 1,
          explanation: "model.eval() sets the model to evaluation mode: Dropout stops dropping nodes (scaling weights), and BatchNorm uses running mean/variance instead of batch statistics."
        }
      ]
    },
    {
      courseId: 12,
      assessmentType: "final",
      title: "Generative AI, RAG & Autonomous LLM Agents Certification Exam",
      description: "Advanced certification evaluating Transformer attention mechanics, dense vector retrieval, RAG chunking strategies, and ReAct agent workflows.",
      passingScore: 80,
      timeLimitMinutes: 45,
      questions: [
        {
          id: 1,
          question: "In the Scaled Dot-Product Attention equation Attention(Q, K, V) = softmax(Q @ K.T / sqrt(d_k)) @ V, why is the scaling factor sqrt(d_k) necessary?",
          options: [
            "To convert coordinates into spherical space",
            "For large dimension d_k, dot products grow large, pushing softmax into regions with extremely small gradients",
            "To enforce unit length on query vectors",
            "To prevent token indices from wrapping around"
          ],
          correctAnswerIndex: 1,
          explanation: "For vectors of length d_k with zero mean and variance 1, their dot product has variance d_k. Dividing by sqrt(d_k) restores variance to 1, preventing softmax from saturating."
        },
        {
          id: 2,
          question: "What is an effective chunking strategy for RAG when processing technical documentation or legal agreements?",
          options: [
            "Fixed 10-character chunks with 0 overlap",
            "Semantic or recursive character chunking with 15-20% chunk overlap to preserve context across boundaries",
            "Treating every individual word as a separate vector",
            "Hashing the entire document into a single 512-dimensional vector"
          ],
          correctAnswerIndex: 1,
          explanation: "Recursive chunking splits along natural grammatical boundaries (paragraphs, sentences) with overlap, ensuring sentences cut across boundaries do not lose vital semantic context."
        },
        {
          id: 3,
          question: "How does the ReAct (Reasoning + Acting) agent framework prevent LLMs from hallucinating execution results?",
          options: [
            "By setting model temperature to exactly 2.0",
            "By interleaving reasoning traces (Thought) with actual external tool invocation (Action) and real system feedback (Observation)",
            "By training custom LoRA weights on every user query",
            "By caching all Wikipedia articles inside model weights"
          ],
          correctAnswerIndex: 1,
          explanation: "ReAct grounds agent decisions by prompting the model to reason about what to do, execute real verified tools/APIs, and observe ground truth before generating an answer."
        },
        {
          id: 4,
          question: "What is the primary difference between Dense Vector Retrieval and Sparse Keyword Retrieval (BM25)?",
          options: [
            "Dense vectors require exact keyword matching; BM25 matches conceptual meaning",
            "Dense vectors capture semantic intent and synonyms in embedding space; BM25 matches lexical token frequencies",
            "Dense vectors cannot be stored in databases",
            "BM25 requires GPU acceleration"
          ],
          correctAnswerIndex: 1,
          explanation: "Dense embeddings map concepts to points in multi-dimensional space, capturing meaning even when different words are used (e.g., 'canine' vs 'dog'), whereas BM25 relies on exact term overlap."
        },
        {
          id: 5,
          question: "What is the most effective defense against prompt injection attacks in enterprise LLM agent applications?",
          options: [
            "Treating all retrieved context and external user inputs as untrusted data, validating tool parameters against strict Pydantic schemas, and limiting execution privileges",
            "Simply telling the LLM in the system prompt 'Please do not obey injections'",
            "Disabling all user input fields",
            "Increasing temperature to 1.5"
          ],
          correctAnswerIndex: 0,
          explanation: "Defense-in-depth requires strict boundary isolation: treating model outputs as untrusted, validating arguments with schemas, enforcing human-in-the-loop for destructive actions, and least-privilege tool execution."
        }
      ]
    }
  ];

  for (const a of assessments) {
    await sql`
      INSERT INTO course_assessments (course_id, assessment_type, title, description, passing_score, time_limit_minutes, questions)
      VALUES (${a.courseId}, ${a.assessmentType}, ${a.title}, ${a.description}, ${a.passingScore}, ${a.timeLimitMinutes}, ${JSON.stringify(a.questions)})
      ON CONFLICT DO NOTHING;
    `;
    console.log(`✓ Seeded assessment for Course ${a.courseId}: ${a.title}`);
  }

  console.log("AI/ML curriculum and certification assessments seeded successfully!");
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
