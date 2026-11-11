{/* Doctors Section */}
            <section className="doctors-section">
                <h2>Available Doctors</h2>
                <div className="doctors-grid">
                    {doctors.length === 0 ? (
                        <p>No doctor profiles created yet. Add a doctor profile via the backend API to see them here.</p>
                    ) : (
                        doctors.map((doc) => (
                            <div key={doc._id} className="doctor-card">
                                <img src="/src/assets/images/doctor-placeholder-1.jpg" alt="Doctor" className="doctor-avatar" />
                                <h3>{doc.name || 'Dr. Specialist'}</h3>
                                <p className="specialization">{doc.specialization}</p>
                                <p className="qualification"><strong>Qualifications:</strong> {doc.qualifications}</p>
                                <p><strong>Experience:</strong> {doc.experience} Years</p>
                                <p className="fee"><strong>Fee:</strong> ${doc.fee}</p>
                                <p className="slots"><strong>Days:</strong> {doc.days}</p>
                                <Link to={`/appointments`} className="btn-book">Book Appointment</Link>
                            </div>
                        ))
                    )}
                </div>
            </section>