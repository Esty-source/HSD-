import React, { useRef, useEffect } from 'react';
import { 
  XMarkIcon, 
  CalendarIcon, 
  UserIcon, 
  ArrowDownTrayIcon, 
  ShareIcon, 
  BookmarkIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';
// Import removed as we'll pass resourceCategories as a prop
import toast from 'react-hot-toast';

// Resource content by category
const resourceContent = {
  'health-tips': {
    content: `
      <h2>Health Tips for Daily Wellness</h2>
      <p>Maintaining good health is a daily commitment that involves making conscious choices about your lifestyle, diet, and physical activity. Here are some essential health tips that can help you stay healthy and prevent illness:</p>
      
      <h3>Nutrition</h3>
      <ul>
        <li>Eat a balanced diet rich in fruits, vegetables, whole grains, and lean proteins</li>
        <li>Limit processed foods, sugary drinks, and excessive salt intake</li>
        <li>Stay hydrated by drinking at least 8 glasses of water daily</li>
        <li>Practice portion control to maintain a healthy weight</li>
      </ul>
      
      <h3>Physical Activity</h3>
      <ul>
        <li>Aim for at least 150 minutes of moderate-intensity exercise per week</li>
        <li>Incorporate both cardiovascular exercise and strength training</li>
        <li>Take short walking breaks throughout the day if you have a sedentary job</li>
        <li>Find activities you enjoy to make exercise sustainable</li>
      </ul>
      
      <h3>Sleep</h3>
      <ul>
        <li>Aim for 7-9 hours of quality sleep each night</li>
        <li>Maintain a consistent sleep schedule, even on weekends</li>
        <li>Create a relaxing bedtime routine</li>
        <li>Keep your bedroom cool, dark, and quiet</li>
      </ul>
      
      <h3>Stress Management</h3>
      <ul>
        <li>Practice mindfulness or meditation daily</li>
        <li>Take breaks throughout the day to reset</li>
        <li>Connect with loved ones regularly</li>
        <li>Seek professional help if stress becomes overwhelming</li>
      </ul>
      
      <h3>Preventive Care</h3>
      <ul>
        <li>Schedule regular check-ups with your healthcare provider</li>
        <li>Stay up-to-date on recommended vaccinations</li>
        <li>Get screened for common health conditions based on your age and risk factors</li>
        <li>Practice good hygiene, including regular handwashing</li>
      </ul>
    `,
    pdf: 'health-tips-guide.pdf'
  },
  'medical-guides': {
    content: `
      <h2>Medical Guide: Understanding Common Health Conditions</h2>
      <p>This comprehensive guide provides information about common health conditions, their symptoms, causes, and management strategies. Always consult with a healthcare professional for personalized medical advice.</p>
      
      <h3>Hypertension (High Blood Pressure)</h3>
      <p><strong>Description:</strong> A common condition where the force of blood against artery walls is consistently too high.</p>
      <p><strong>Symptoms:</strong> Often asymptomatic, but severe cases may cause headaches, shortness of breath, or nosebleeds.</p>
      <p><strong>Management:</strong></p>
      <ul>
        <li>Regular blood pressure monitoring</li>
        <li>Medication as prescribed by your doctor</li>
        <li>Reducing sodium intake</li>
        <li>Regular physical activity</li>
        <li>Maintaining a healthy weight</li>
        <li>Limiting alcohol consumption</li>
      </ul>
      
      <h3>Type 2 Diabetes</h3>
      <p><strong>Description:</strong> A chronic condition affecting how the body processes blood sugar (glucose).</p>
      <p><strong>Symptoms:</strong> Increased thirst, frequent urination, hunger, fatigue, blurred vision, slow-healing sores.</p>
      <p><strong>Management:</strong></p>
      <ul>
        <li>Regular blood glucose monitoring</li>
        <li>Medication or insulin as prescribed</li>
        <li>Balanced diet with controlled carbohydrate intake</li>
        <li>Regular physical activity</li>
        <li>Weight management</li>
        <li>Regular foot checks and eye exams</li>
      </ul>
      
      <h3>Asthma</h3>
      <p><strong>Description:</strong> A condition causing airways to narrow, swell, and produce extra mucus, making breathing difficult.</p>
      <p><strong>Symptoms:</strong> Shortness of breath, chest tightness, wheezing, coughing, especially at night or early morning.</p>
      <p><strong>Management:</strong></p>
      <ul>
        <li>Identifying and avoiding triggers</li>
        <li>Using prescribed inhalers correctly</li>
        <li>Following an asthma action plan</li>
        <li>Regular check-ups with healthcare provider</li>
      </ul>
    `,
    pdf: 'medical-conditions-guide.pdf'
  },
  'educational-videos': {
    content: `
      <h2>Video Resources for Health Education</h2>
      <p>Visual learning can be an effective way to understand complex health topics. Our educational videos provide clear, accurate information on various health subjects.</p>
      
      <div class="video-container">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      
      <h3>Video Topics Available:</h3>
      <ul>
        <li>Understanding Blood Pressure Readings</li>
        <li>How to Use an Inhaler Correctly</li>
        <li>Signs and Symptoms of Diabetes</li>
        <li>Proper Handwashing Technique</li>
        <li>Basic First Aid Procedures</li>
        <li>Healthy Meal Preparation</li>
      </ul>
      
      <p>These videos are designed to supplement, not replace, professional medical advice. Always consult with a healthcare provider for personalized guidance.</p>
    `,
    pdf: 'health-education-videos.pdf'
  },
  'news': {
    content: `
      <h2>Latest Health News and Updates</h2>
      <p>Staying informed about the latest developments in healthcare is essential for making informed decisions about your health. Here are some recent updates in the health sector:</p>
      
      <h3>New Research on Malaria Prevention</h3>
      <p>Recent studies have shown promising results for a new approach to malaria prevention using a combination of existing medications and preventive measures. Researchers at the University of Yaoundé have discovered that combining traditional bed nets with a new repellent formula can reduce malaria transmission by up to 78% in high-risk areas.</p>
      
      <h3>COVID-19 Vaccination Campaign Expands</h3>
      <p>The Ministry of Health has announced an expansion of the COVID-19 vaccination campaign to include more rural areas. Mobile vaccination units will be deployed to remote villages, ensuring that all citizens have access to vaccines regardless of their location.</p>
      
      <h3>Breakthrough in Diabetes Treatment</h3>
      <p>A new medication for Type 2 diabetes has shown remarkable results in clinical trials, with patients experiencing better glucose control and fewer side effects compared to traditional treatments. The medication is expected to be available in local pharmacies by the end of the year.</p>
      
      <h3>Mental Health Awareness Initiative</h3>
      <p>A nationwide mental health awareness campaign has been launched to reduce stigma and encourage people to seek help for mental health concerns. The initiative includes free counseling services at community health centers and educational programs in schools.</p>
    `,
    pdf: 'health-news-updates.pdf'
  },
  'research': {
    content: `
      <h2>Research Findings: Climate Change and Public Health in Cameroon</h2>
      <p><strong>Authors:</strong> Prof. Nkengasong John, Dr. Mbarga Elise, Dr. Fon Peter</p>
      <p><strong>Publication Date:</strong> March 10, 2024</p>
      
      <h3>Abstract</h3>
      <p>This research examines the impact of climate change on public health outcomes in Cameroon, with a focus on vector-borne diseases, heat-related illnesses, and food security. Using data collected from 2018-2023 across multiple regions, we identify significant correlations between changing climate patterns and increased disease burden, particularly in rural communities.</p>
      
      <h3>Key Findings</h3>
      <ul>
        <li>A 1.5°C increase in average temperature was associated with a 12% rise in malaria cases in northern regions</li>
        <li>Changing rainfall patterns have led to increased breeding grounds for disease vectors in previously unaffected areas</li>
        <li>Heat-related illnesses have increased by 23% over the study period, particularly affecting elderly populations</li>
        <li>Crop yields in certain regions have decreased by up to 15%, impacting nutritional status of vulnerable populations</li>
      </ul>
      
      <h3>Methodology</h3>
      <p>Our research employed a mixed-methods approach, combining quantitative analysis of climate and health data with qualitative interviews of healthcare workers and community members. Temperature and precipitation data were collected from 24 weather stations across the country, while health data was obtained from 78 healthcare facilities.</p>
      
      <h3>Recommendations</h3>
      <ul>
        <li>Implement early warning systems for extreme weather events and disease outbreaks</li>
        <li>Strengthen healthcare infrastructure in vulnerable regions</li>
        <li>Promote climate-resilient agricultural practices</li>
        <li>Increase public education about climate-related health risks</li>
        <li>Integrate climate considerations into national health policy</li>
      </ul>
      
      <h3>Conclusion</h3>
      <p>Climate change represents a significant and growing threat to public health in Cameroon. Proactive adaptation strategies and cross-sector collaboration are essential to mitigate these impacts and protect vulnerable populations.</p>
    `,
    pdf: 'climate-change-health-research.pdf'
  }
};

const ResourceModal = ({ resource, isOpen, onClose, resourceCategories }) => {
  const modalRef = useRef();
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  // Find the category object
  const category = resourceCategories ? resourceCategories.find(cat => cat.id === resource.category) : null;
  
  // Get content for this resource category
  const content = resourceContent[resource.category] || resourceContent['health-tips'];
  
  const handleDownload = () => {
    try {
      // Create a text file with the resource content
      const textContent = `
${resource.title}

Category: ${category?.name || resource.category}
Author: ${resource.author}
Date: ${resource.date}

Description:
${resource.description}

For more information, please visit our Health Service Directory.
    `;
    
      // Create a blob and download it
      const element = document.createElement('a');
      const file = new Blob([textContent], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `${resource.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    
      toast.success(`Downloaded "${resource.title}" as text file`);
    } catch (error) {
      console.error('Error generating file:', error);
      toast.error('Failed to generate file. Please try again.');
    }
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => toast.success('Link copied to clipboard'))
      .catch(() => toast.error('Failed to copy link'));
  };
  
  const handleBookmark = () => {
    toast.success(`${resource.title} added to bookmarks`);
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Resource Details</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        
        {/* Resource content */}
        <div className="overflow-y-auto flex-grow">
          {/* Resource header */}
          <div className="relative h-64 bg-gray-900">
            <img
              src={resource.imageUrl}
              alt={resource.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/1200x600?text=Health+Resource';
              }}
            />
            {resource.category === 'educational-videos' && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <button className="bg-white bg-opacity-80 rounded-full p-6 hover:bg-opacity-100 transition-all">
                  <VideoCameraIcon className="h-12 w-12 text-blue-600" />
                </button>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              {category?.icon && (
                <div className="flex items-center mb-3">
                  <div className={`p-2 rounded-full ${category.color} mr-2`}>
                    {React.createElement(category.icon, { className: "h-5 w-5" })}
                  </div>
                  <span className="text-sm font-medium text-white">
                    {category.name}
                  </span>
                </div>
              )}
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{resource.title}</h1>
            </div>
          </div>
          
          {/* Resource metadata */}
          <div className="border-b border-gray-100">
            <div className="px-6 py-4 flex flex-wrap gap-4">
              <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon className="h-4 w-4 mr-1.5" />
                <span>{resource.date}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <UserIcon className="h-4 w-4 mr-1.5" />
                <span>{resource.author}</span>
              </div>
            </div>
          </div>
          
          {/* Resource content */}
          <div className="px-6 py-8">
            <p className="text-gray-700 mb-8 leading-relaxed">
              {resource.description}
            </p>
            
            {/* Render HTML content */}
            <div 
              className="prose prose-blue max-w-none"
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="border-t border-gray-100 p-4 bg-gray-50">
          <div className="flex flex-wrap gap-3 justify-end">
            <button
              onClick={handleDownload}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
              Download PDF
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ShareIcon className="h-4 w-4 mr-2" />
              Share
            </button>
            <button
              onClick={handleBookmark}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <BookmarkIcon className="h-4 w-4 mr-2" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceModal;
