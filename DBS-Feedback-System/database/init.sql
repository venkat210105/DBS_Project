-- DBS Feedback System Database Initialization
-- This script creates the initial database schema and sample data

USE dbs_feedback;

-- Create feedback table if it doesn't exist
CREATE TABLE IF NOT EXISTS feedback (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    feedback TEXT NOT NULL,
    service_category VARCHAR(100),
    service_channel VARCHAR(100),
    customer_type VARCHAR(100),
    business_unit VARCHAR(100),
    rating INT DEFAULT 5,
    user_name VARCHAR(255),
    user_email VARCHAR(255),
    comment TEXT,
    product_id BIGINT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_customer_name (customer_name),
    INDEX idx_service_category (service_category),
    INDEX idx_rating (rating),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample feedback data for testing
INSERT IGNORE INTO feedback (
    customer_name, email, feedback, service_category, service_channel, 
    customer_type, business_unit, rating
) VALUES 
('John Doe', 'john.doe@email.com', 'Excellent banking experience with DBS. The digital services are top-notch.', 'Digital Banking', 'Mobile App', 'Individual', 'Retail Banking', 5),
('Jane Smith', 'jane.smith@business.com', 'Good corporate banking solutions, but could improve response time.', 'Corporate Banking', 'Branch', 'Corporate', 'Corporate Banking', 4),
('Michael Chen', 'michael.chen@email.com', 'Outstanding investment advisory services. Very professional team.', 'Investment', 'Online', 'Premium', 'Private Banking', 5),
('Sarah Wilson', 'sarah.wilson@company.com', 'Loan application process was smooth and efficient.', 'Loans', 'Phone', 'Business', 'Retail Banking', 4),
('David Kim', 'david.kim@email.com', 'ATM services are reliable, but would like more locations.', 'Banking', 'ATM', 'Individual', 'Retail Banking', 3);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_feedback_search ON feedback (customer_name, service_category, rating);
CREATE INDEX IF NOT EXISTS idx_feedback_date_range ON feedback (created_at, rating);

-- Show table status
SELECT 'Database initialization completed successfully' as status;
SELECT COUNT(*) as total_feedback FROM feedback;