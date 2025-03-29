import React from 'react';

const DropResume = () => {
    return (
        <section
            className="tp-feature-3-area pt-100"
            style={{ backgroundImage: `url(/assets/img/feature/home-3/feature-bg.png)` }}
        >
            <div className="container">
                <div className="row gx-0 justify-content-center">
                    <div className="col-xl-12">
                        <div className="tp-feature-3-text-style text-center fadeUp">
                            <h4>
                                Drop Your Resume on{' '}
                                <a href="mailto:hr@spireeta.com" className="text-decoration-none">
                                    hr@spireeta.com
                                </a>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DropResume;
