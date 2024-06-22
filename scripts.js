
function validateAndGenerate() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const school = document.getElementById('school').value;
    const degree = document.getElementById('degree').value;
    const gradYear = document.getElementById('gradYear').value;
    const languagesknown = document.getElementById('languagesknown').value.split(',').map(lang => lang.trim());
    const company = document.getElementById('company').value;
    const role = document.getElementById('role').value;
    const duration = parseInt(document.getElementById('duration').value, 10);

    if (!name || !email || !phone || !school || !degree || !gradYear || !languagesknown || !company || !role || isNaN(duration)) {
        alert('Please fill out all fields.');
        return;
    }

    if (!validateName(name)) {
        alert('Please enter a valid name without numbers.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!validatePhone(phone)) {
        alert('Please enter a valid phone number (10 digits).');
        return;
    }

    if (!validateGradYear(gradYear)) {
        alert('Please enter a valid graduation year (between 1900 and 2099).');
        return;
    }

    generateResume(name, email, phone, school, degree, gradYear, languagesknown, company, role, duration);
    checkEligibility(languagesknown, duration);
}

function validateName(name) {
    const re = /^[A-Za-z\s]+$/;
    return re.test(name);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
}

function validateGradYear(gradYear) {
    const year = parseInt(gradYear, 10);
    return year >= 1900 && year <= 2099;
}

function checkEligibility(languagesknown, experience) {
    // Check if languages known include at least Python and JavaScript
    const hasPython = languagesknown.toLowerCase().includes('python');
    const hasJavaScript = languagesknown.toLowerCase().includes('javascript');
    // Check if experience is at least 2 years
    const hasExperience = parseFloat(experience) >= 2;

    return hasPython && hasJavaScript && hasExperience;
}
function generateResume(name, email, phone, school, degree, gradYear, languagesknown, company, role, duration) {
    const resumeContent = `
        <h3>${name}</h3>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <hr>
        <h3>Education</h3>
        <p>${school}</p>
        <p>Degree: ${degree}</p>
        <p>Graduation Year: ${gradYear}</p>
        <hr>
        <h3>Skills</h3>
        <p>Languages Known: ${languagesknown.join(', ')}</p>
        <h3>Work Experience</h3>
        <p>Company: ${company}</p>
        <p>Role: ${role}</p>
        <p>Duration: ${duration} years</p>
    `;

    document.getElementById('resumeContent').innerHTML = resumeContent;

    const qrValue = `https://github.com/sai-shiva-ram/Resume-builder//resume.html?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&school=${encodeURIComponent(school)}&degree=${encodeURIComponent(degree)}&gradYear=${encodeURIComponent(gradYear)}&languagesknown=${encodeURIComponent(languagesknown.join(','))}&company=${encodeURIComponent(company)}&role=${encodeURIComponent(role)}&duration=${encodeURIComponent(duration)}`;

    // Generate QR Code
    const qr = new QRious({
        element: document.getElementById('qrCode'),
        value: qrValue,
        size: 200
    });
}

function displayResume() {
    const { languagesknown, duration } = getQueryParams();
    const isEligible = checkEligibility(languagesknown, duration);

    if (isEligible) {
        document.getElementById('submitBtn').style.display = 'block';
    } else {
        // Provide suggestions for improvement
        const suggestions = [];
        if (!languagesknown.toLowerCase().includes('python')) {
            suggestions.push('Python');
        }
        if (!languagesknown.toLowerCase().includes('javascript')) {
            suggestions.push('JavaScript');
        }
        if (parseFloat(duration) < 2) {
            suggestions.push('More than 2 years of experience');
        }

        alert('You are not eligible for the position. Consider gaining the following skills/experience: ' + suggestions.join(', '));
    }
}

function submitResume() {
    const { name, email, phone, school, degree, gradYear, languagesknown, company, role, duration } = getQueryParams();
    const resumeContent = `
Name: ${name}
Email: ${email}
Phone: ${phone}
School: ${school}
Degree: ${degree}
Graduation Year: ${gradYear}
Languages Known: ${languagesknown}
Company: ${company}
Role: ${role}
Duration: ${duration}
`;

    // Save the resume content to a file on the company's website (simulated by an alert)
    alert('Resume submitted successfully:\n\n' + resumeContent);
}

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get('name'),
        email: params.get('email'),
        phone: params.get('phone'),
        school: params.get('school'),
        degree: params.get('degree'),
        gradYear: params.get('gradYear'),
        languagesknown: params.get('languagesknown'),
        company: params.get('company'),
        role: params.get('role'),
        duration: params.get('duration')
    };
}
async function submitResume() {
    const resumeData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      school: document.getElementById('school').value,
      degree: document.getElementById('degree').value,
      gradYear: document.getElementById('gradYear').value,
      languagesKnown: document.getElementById('languagesknown').value,
      company: document.getElementById('company').value,
      role: document.getElementById('role').value,
      duration: document.getElementById('duration').value
    };
  
    const response = await fetch('YOUR_GOOGLE_SCRIPT_WEB_APP_URL', {
      method: 'POST',
      body: JSON.stringify(resumeData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    const result = await response.text();
    alert(result);
  }
  
window.onload = displayResume;
