// Fetch and display students
async function fetchStudents() {
    try {
        const response = await fetch('http://localhost:3000/students');
        const students = await response.json();
        displayStudents(students);
    } catch (error) {
        console.error('Error fetching students:', error);
    }
}

function displayStudents(students) {
    const studentList = document.getElementById('student-list');
    studentList.innerHTML = '<h2>Student List</h2>'; // Clear previous content

    students.forEach(student => {
        const studentItem = document.createElement('div');
        studentItem.className = 'student-item';
        studentItem.innerHTML = `
            <strong>Name:</strong> ${student.student_name} <br>
            <strong>Department ID:</strong> ${student.dept_id} <br>
            <strong>Year:</strong> ${student.year_of_enrollment} <br>
            <strong>Email:</strong> ${student.email}
        `;
        studentList.appendChild(studentItem);
    });
}

// Add a new student
document.getElementById('studentForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const deptId = document.getElementById('deptId').value;
    const year = document.getElementById('year').value;
    const email = document.getElementById('email').value;

    try {
        await fetch('http://localhost:3000/add-student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                student_name: name,
                dept_id: parseInt(deptId),
                year_of_enrollment: parseInt(year),
                email: email,
            }),
        });

        document.getElementById('studentForm').reset(); // Clear form
        fetchStudents(); // Refresh student list
    } catch (error) {
        console.error('Error adding student:', error);
    }
});

// Initial fetch of students
fetchStudents();
