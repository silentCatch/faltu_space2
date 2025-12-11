"""
🎂 Birthday Gift Web Application for Manisha Rana (Faltu) 🎂
A special gift turning 25 on December 12, 2000
Created with love ❤️
"""

from flask import Flask, render_template, jsonify, request
from datetime import datetime
import random
import string
import json

app = Flask(__name__)

# ==================== ROUTES ====================

@app.route('/')
def home():
    """Home page with birthday wishes"""
    birthday_info = {
        'name': 'Manisha Rana',
        'pet_name': 'Faltu',
        'dob': 'December 12, 2000',
        'age': 25,
        'birthday_date': 'December 12, 2025'
    }
    return render_template('index.html', info=birthday_info)

@app.route('/qa-utility')
def qa_utility():
    """QA Utility Kit page"""
    return render_template('qa_utility.html')

@app.route('/release-notes')
def release_notes():
    """Release Notes page"""
    return render_template('release_notes.html')

@app.route('/stress-buster')
def stress_buster():
    """Stress Buster page"""
    return render_template('stress_buster.html')

@app.route('/ai-tester')
def ai_tester():
    """AI App Tester page"""
    return render_template('ai_tester.html')

# ==================== API ENDPOINTS ====================

@app.route('/api/generate-data', methods=['POST'])
def generate_data():
    """Generate test data based on selected types"""
    data = request.json
    data_types = data.get('types', [])
    count = min(data.get('count', 10), 100)  # Max 100 records
    
    generated = []
    
    first_names = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'William',
                   'Mia', 'James', 'Charlotte', 'Benjamin', 'Amelia', 'Lucas', 'Harper', 'Henry', 'Evelyn', 'Alexander']
    last_names = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
                  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin']
    domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'company.com', 'test.org']
    streets = ['Main St', 'Oak Ave', 'Elm St', 'Park Blvd', 'Cedar Ln', 'Maple Dr', 'Pine Rd', 'Lake View', 'Hill Top', 'River Side']
    cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'Austin']
    companies = ['TechCorp', 'InnovateLabs', 'DataFlow Inc', 'CloudNine', 'ByteWise', 'CodeCraft', 'DigitalDreams', 'FutureTech', 'SmartSolutions', 'WebWorks']
    
    for i in range(count):
        record = {}
        first = random.choice(first_names)
        last = random.choice(last_names)
        
        if 'name' in data_types:
            record['name'] = f"{first} {last}"
        if 'firstName' in data_types:
            record['firstName'] = first
        if 'lastName' in data_types:
            record['lastName'] = last
        if 'email' in data_types:
            record['email'] = f"{first.lower()}.{last.lower()}{random.randint(1, 999)}@{random.choice(domains)}"
        if 'phone' in data_types:
            record['phone'] = f"+1-{random.randint(200, 999)}-{random.randint(100, 999)}-{random.randint(1000, 9999)}"
        if 'address' in data_types:
            record['address'] = f"{random.randint(100, 9999)} {random.choice(streets)}, {random.choice(cities)}"
        if 'company' in data_types:
            record['company'] = random.choice(companies)
        if 'username' in data_types:
            record['username'] = f"{first.lower()}_{last.lower()}{random.randint(1, 99)}"
        if 'password' in data_types:
            record['password'] = ''.join(random.choices(string.ascii_letters + string.digits + '!@#$%', k=12))
        if 'uuid' in data_types:
            record['uuid'] = f"{random.randint(10000000, 99999999)}-{random.randint(1000, 9999)}-{random.randint(1000, 9999)}-{random.randint(1000, 9999)}-{random.randint(100000000000, 999999999999)}"
        if 'date' in data_types:
            record['date'] = f"{random.randint(2020, 2025)}-{random.randint(1, 12):02d}-{random.randint(1, 28):02d}"
        if 'creditCard' in data_types:
            record['creditCard'] = f"{random.randint(4000, 4999)}-{random.randint(1000, 9999)}-{random.randint(1000, 9999)}-{random.randint(1000, 9999)}"
        if 'ipAddress' in data_types:
            record['ipAddress'] = f"{random.randint(1, 255)}.{random.randint(0, 255)}.{random.randint(0, 255)}.{random.randint(1, 255)}"
        if 'url' in data_types:
            record['url'] = f"https://www.{random.choice(companies).lower().replace(' ', '')}.com/{random.choice(['products', 'services', 'about', 'contact', 'blog'])}"
        
        generated.append(record)
    
    return jsonify({'data': generated})

@app.route('/api/quotes')
def get_quotes():
    """Get motivational quotes"""
    quotes = [
        {"quote": "The only way to do great work is to love what you do.", "author": "Steve Jobs"},
        {"quote": "Bugs are just features waiting to be discovered! 🐛", "author": "Every Developer Ever"},
        {"quote": "It works on my machine! 💻", "author": "Classic Developer"},
        {"quote": "99 little bugs in the code, take one down, patch it around... 127 little bugs in the code.", "author": "QA Legend"},
        {"quote": "Testing leads to failure, and failure leads to understanding.", "author": "Burt Rutan"},
        {"quote": "Quality is not an act, it is a habit.", "author": "Aristotle"},
        {"quote": "First, solve the problem. Then, write the code.", "author": "John Johnson"},
        {"quote": "The best time to plant a tree was 20 years ago. The second best time is now.", "author": "Chinese Proverb"},
        {"quote": "You're doing amazing sweetie! 💪", "author": "Your Supportive Friend"},
        {"quote": "Coffee + Code = Magic ☕✨", "author": "Every Programmer"},
    ]
    return jsonify(random.choice(quotes))

@app.route('/api/memes')
def get_memes():
    """Get developer/QA memes"""
    memes = [
        {"text": "Me: *fixes one bug*\nCode: Here's 10 more! 🎁", "emoji": "🐛"},
        {"text": "Production: *works perfectly*\nMe: I don't trust it... 🤔", "emoji": "😰"},
        {"text": "QA: 'Found a bug!'\nDev: 'That's a feature!' 😎", "emoji": "🔥"},
        {"text": "Tests passing: ✅\nConfidence: Still zero 😅", "emoji": "🎭"},
        {"text": "Friday deploy?\nMonday regret! 📅", "emoji": "💀"},
        {"text": "Debugging: 10% coding\n90% wondering why 🤷", "emoji": "🔍"},
        {"text": "Works in dev ✅\nWorks in staging ✅\nProd: NOPE ❌", "emoji": "🎪"},
        {"text": "Me: 'It's a simple fix'\n*3 hours later*\nMe: 'We need to refactor everything' 😭", "emoji": "⏰"},
    ]
    return jsonify(random.choice(memes))

@app.route('/api/test-cases', methods=['POST'])
def generate_test_cases():
    """Generate test cases based on category"""
    data = request.json
    category = data.get('category', 'ui')
    
    test_cases = {
        'ui': [
            {'id': 'TC001', 'name': 'Button Click Response', 'steps': '1. Navigate to page\n2. Click button\n3. Verify response', 'expected': 'Action completed successfully'},
            {'id': 'TC002', 'name': 'Form Validation', 'steps': '1. Leave required fields empty\n2. Submit form\n3. Check error messages', 'expected': 'Validation errors displayed'},
            {'id': 'TC003', 'name': 'Responsive Layout', 'steps': '1. Resize browser\n2. Check mobile view\n3. Verify elements', 'expected': 'Layout adapts correctly'},
            {'id': 'TC004', 'name': 'Theme Toggle', 'steps': '1. Click theme toggle\n2. Verify color changes\n3. Check persistence', 'expected': 'Theme switches properly'},
            {'id': 'TC005', 'name': 'Navigation Flow', 'steps': '1. Click menu items\n2. Verify page loads\n3. Check breadcrumbs', 'expected': 'Navigation works smoothly'},
        ],
        'api': [
            {'id': 'TC101', 'name': 'GET Request Success', 'steps': '1. Send GET request\n2. Check status code\n3. Validate response', 'expected': 'Status 200, valid JSON'},
            {'id': 'TC102', 'name': 'POST Request Validation', 'steps': '1. Send POST with invalid data\n2. Check error response\n3. Verify error codes', 'expected': 'Status 400, error details'},
            {'id': 'TC103', 'name': 'Authentication Test', 'steps': '1. Send request without token\n2. Verify 401 response\n3. Add valid token\n4. Verify success', 'expected': 'Proper auth handling'},
            {'id': 'TC104', 'name': 'Rate Limiting', 'steps': '1. Send multiple requests\n2. Exceed rate limit\n3. Check 429 response', 'expected': 'Rate limit enforced'},
            {'id': 'TC105', 'name': 'API Timeout', 'steps': '1. Simulate slow response\n2. Check timeout handling\n3. Verify error message', 'expected': 'Graceful timeout handling'},
        ],
        'ai': [
            {'id': 'TC201', 'name': 'Prompt Injection Test', 'steps': '1. Send malicious prompt\n2. Check AI response\n3. Verify no data leak', 'expected': 'AI refuses/handles safely'},
            {'id': 'TC202', 'name': 'Context Length Test', 'steps': '1. Send very long input\n2. Check handling\n3. Verify response quality', 'expected': 'Graceful handling'},
            {'id': 'TC203', 'name': 'Hallucination Check', 'steps': '1. Ask factual question\n2. Verify accuracy\n3. Check sources', 'expected': 'Accurate information'},
            {'id': 'TC204', 'name': 'Bias Detection', 'steps': '1. Test with diverse inputs\n2. Analyze responses\n3. Check for bias', 'expected': 'Fair, unbiased responses'},
            {'id': 'TC205', 'name': 'Safety Guardrails', 'steps': '1. Send harmful request\n2. Verify refusal\n3. Check safety message', 'expected': 'Appropriate safety response'},
        ],
        'security': [
            {'id': 'TC301', 'name': 'SQL Injection', 'steps': "1. Input SQL in fields\n2. Submit form\n3. Check handling", 'expected': 'Input sanitized'},
            {'id': 'TC302', 'name': 'XSS Attack', 'steps': '1. Input script tags\n2. Check rendering\n3. Verify escaping', 'expected': 'Scripts not executed'},
            {'id': 'TC303', 'name': 'CSRF Protection', 'steps': '1. Attempt cross-site request\n2. Verify token requirement\n3. Check rejection', 'expected': 'CSRF blocked'},
            {'id': 'TC304', 'name': 'Data Exposure', 'steps': '1. Check API responses\n2. Verify no sensitive data\n3. Check logs', 'expected': 'No data leakage'},
            {'id': 'TC305', 'name': 'Auth Bypass', 'steps': '1. Try accessing protected routes\n2. Manipulate tokens\n3. Verify protection', 'expected': 'Authentication enforced'},
        ],
    }
    
    return jsonify({'testCases': test_cases.get(category, test_cases['ui'])})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
