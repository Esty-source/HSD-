import { supabase } from './supabase';

/**
 * This file contains functions to migrate mock data to Supabase
 * Run these functions only once to populate your database with initial data
 */

// Sample doctors data
const mockDoctors = [
  {
    full_name: 'Dr. Ngono Marie',
    email: 'ngono.marie@healthdirectory.com',
    role: 'doctor',
    specialty: 'Cardiology',
    bio: 'Experienced cardiologist with over 10 years of practice in treating heart conditions.',
    phone: '+237 654 321 987',
    address: 'Douala Medical Center, Bonanjo, Douala',
    avatar_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    full_name: 'Dr. Fon Peter',
    email: 'fon.peter@healthdirectory.com',
    role: 'doctor',
    specialty: 'Pediatrics',
    bio: 'Dedicated pediatrician focused on providing comprehensive care for children from birth through adolescence.',
    phone: '+237 678 543 210',
    address: 'Children\'s Health Clinic, Yaounde',
    avatar_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    full_name: 'Dr. Biya Rose',
    email: 'biya.rose@healthdirectory.com',
    role: 'doctor',
    specialty: 'Obstetrics & Gynecology',
    bio: 'Specialized in women\'s health with a focus on pregnancy, childbirth, and reproductive health.',
    phone: '+237 699 876 543',
    address: 'Women\'s Health Center, Bamenda',
    avatar_url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    full_name: 'Dr. Kamto James',
    email: 'kamto.james@healthdirectory.com',
    role: 'doctor',
    specialty: 'General Medicine',
    bio: 'General practitioner providing primary healthcare services for patients of all ages.',
    phone: '+237 677 123 456',
    address: 'Central Medical Clinic, Buea',
    avatar_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  }
];

// Sample resources data
const mockResources = [
  {
    title: 'Preventing Malaria: Essential Tips',
    description: 'Learn how to protect yourself and your family from malaria with these essential prevention tips.',
    content: `
      <h2>Understanding Malaria Prevention</h2>
      <p>Malaria is a serious disease transmitted by mosquitoes that can be fatal if not treated promptly. In Cameroon, malaria remains one of the leading causes of illness and death, particularly among children under five years old. However, with proper prevention measures, you can significantly reduce your risk of infection.</p>
      
      <h3>Key Prevention Strategies</h3>
      <ul>
        <li><strong>Use insecticide-treated bed nets (ITNs)</strong> - Sleep under an ITN every night, all year round. Make sure the net is in good condition without holes and properly tucked in.</li>
        <li><strong>Apply insect repellent</strong> - Use repellents containing DEET, picaridin, or IR3535 on exposed skin and clothing.</li>
        <li><strong>Wear protective clothing</strong> - Cover your arms and legs, especially during evening and night hours when mosquitoes are most active.</li>
        <li><strong>Install window screens</strong> - Keep mosquitoes out of your home by installing screens on windows and doors.</li>
        <li><strong>Eliminate breeding sites</strong> - Remove standing water around your home where mosquitoes breed, such as in flower pots, buckets, and old tires.</li>
        <li><strong>Consider preventive medication</strong> - If you're traveling to a high-risk area, consult your doctor about antimalarial drugs.</li>
      </ul>
      
      <h3>Recognizing Malaria Symptoms</h3>
      <p>Early detection is crucial. Be aware of these common symptoms:</p>
      <ul>
        <li>Fever and chills</li>
        <li>Headache and body aches</li>
        <li>Fatigue</li>
        <li>Nausea, vomiting, and diarrhea</li>
      </ul>
      
      <p>If you experience these symptoms, seek medical attention immediately. Prompt diagnosis and treatment can prevent severe illness and save lives.</p>
    `,
    category: 'health-tips',
    author: 'Dr. Ngono Marie',
    image_url: 'https://images.unsplash.com/photo-1584118624012-df056829fbd0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    featured: true
  },
  {
    title: 'Understanding Diabetes Management',
    description: 'A comprehensive guide to managing diabetes, including diet, exercise, and medication.',
    content: `
      <h2>Living Well with Diabetes</h2>
      <p>Diabetes is a chronic condition that affects how your body turns food into energy. With proper management, people with diabetes can lead healthy, active lives. This guide covers the essential aspects of diabetes care.</p>
      
      <h3>Types of Diabetes</h3>
      <ul>
        <li><strong>Type 1 Diabetes</strong> - The body doesn't produce insulin. Requires daily insulin injections.</li>
        <li><strong>Type 2 Diabetes</strong> - The body doesn't use insulin properly. Can often be managed with lifestyle changes and medication.</li>
        <li><strong>Gestational Diabetes</strong> - Occurs during pregnancy and usually resolves after childbirth.</li>
      </ul>
      
      <h3>Nutrition and Diet</h3>
      <p>A balanced diet is crucial for managing blood sugar levels:</p>
      <ul>
        <li>Focus on whole foods like vegetables, fruits, whole grains, and lean proteins</li>
        <li>Limit refined carbohydrates and added sugars</li>
        <li>Monitor carbohydrate intake and be consistent with meal timing</li>
        <li>Stay hydrated by drinking plenty of water</li>
      </ul>
      
      <h3>Physical Activity</h3>
      <p>Regular exercise helps control blood sugar and improves overall health:</p>
      <ul>
        <li>Aim for at least 150 minutes of moderate-intensity activity per week</li>
        <li>Include both aerobic exercise and strength training</li>
        <li>Check blood sugar before, during, and after exercise</li>
        <li>Always carry a fast-acting carbohydrate in case of low blood sugar</li>
      </ul>
      
      <h3>Medication Management</h3>
      <ul>
        <li>Take medications as prescribed</li>
        <li>Learn how to properly store insulin and other medications</li>
        <li>Understand how your medications work and potential side effects</li>
        <li>Keep a consistent schedule for medication</li>
      </ul>
      
      <h3>Regular Monitoring</h3>
      <p>Tracking your blood sugar is essential:</p>
      <ul>
        <li>Check blood glucose levels as recommended by your healthcare provider</li>
        <li>Keep a log of your readings</li>
        <li>Attend regular check-ups and laboratory tests</li>
        <li>Get annual eye exams, foot exams, and kidney function tests</li>
      </ul>
      
      <p>Remember, diabetes management is a team effort. Work closely with your healthcare providers to develop a plan that works for you.</p>
    `,
    category: 'medical-guides',
    author: 'Dr. Fon Peter',
    image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    featured: false
  },
  {
    title: 'Nutrition for Pregnant Women',
    description: 'Essential nutritional advice for expectant mothers to ensure a healthy pregnancy.',
    content: `
      <h2>Eating for Two: Nutrition During Pregnancy</h2>
      <p>Proper nutrition during pregnancy is vital for both maternal health and fetal development. This guide provides essential information on nutritional needs during this important time.</p>
      
      <h3>Key Nutrients for Pregnancy</h3>
      <ul>
        <li><strong>Folate/Folic Acid</strong> - Critical for preventing neural tube defects. Found in leafy greens, fortified grains, and prenatal vitamins.</li>
        <li><strong>Iron</strong> - Supports increased blood volume and prevents anemia. Sources include lean meats, beans, and fortified cereals.</li>
        <li><strong>Calcium</strong> - Essential for developing the baby's bones and teeth. Found in dairy products, fortified plant milks, and leafy greens.</li>
        <li><strong>Protein</strong> - Crucial for the baby's growth. Sources include meat, poultry, fish, eggs, beans, and nuts.</li>
        <li><strong>Omega-3 Fatty Acids</strong> - Important for brain and eye development. Found in fatty fish, flaxseeds, and walnuts.</li>
      </ul>
      
      <h3>Meal Planning During Pregnancy</h3>
      <p>A balanced diet should include:</p>
      <ul>
        <li>Plenty of fruits and vegetables (aim for a variety of colors)</li>
        <li>Whole grains like brown rice, oats, and whole wheat bread</li>
        <li>Lean proteins including fish, poultry, beans, and tofu</li>
        <li>Dairy or fortified alternatives for calcium</li>
        <li>Healthy fats from sources like avocados, nuts, and olive oil</li>
      </ul>
      
      <h3>Foods to Avoid</h3>
      <p>Some foods pose risks during pregnancy:</p>
      <ul>
        <li>Raw or undercooked meat, poultry, eggs, and seafood</li>
        <li>High-mercury fish like shark, swordfish, king mackerel, and tilefish</li>
        <li>Unpasteurized dairy products and juices</li>
        <li>Raw sprouts</li>
        <li>Excess caffeine (limit to 200mg per day)</li>
        <li>Alcohol (no safe amount during pregnancy)</li>
      </ul>
      
      <h3>Managing Common Pregnancy Discomforts</h3>
      <ul>
        <li><strong>Morning sickness</strong> - Try small, frequent meals, ginger tea, and bland foods</li>
        <li><strong>Heartburn</strong> - Eat smaller meals, avoid spicy and fatty foods, and don't lie down right after eating</li>
        <li><strong>Constipation</strong> - Increase fiber intake, stay hydrated, and stay active</li>
        <li><strong>Food cravings and aversions</strong> - Honor your cravings in moderation while maintaining a balanced diet</li>
      </ul>
      
      <p>Remember to take your prenatal vitamins as prescribed and consult with your healthcare provider about your specific nutritional needs during pregnancy.</p>
    `,
    category: 'health-tips',
    author: 'Dr. Biya Rose',
    image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    featured: true
  },
  {
    title: 'COVID-19 Vaccination: What You Need to Know',
    description: 'Important information about COVID-19 vaccines, including efficacy, side effects, and availability.',
    content: `
      <h2>Understanding COVID-19 Vaccines</h2>
      <p>Vaccination is one of our most effective tools to prevent serious illness, hospitalization, and death from COVID-19. This guide provides essential information about COVID-19 vaccines currently available in Cameroon.</p>
      
      <h3>Types of COVID-19 Vaccines</h3>
      <p>Several vaccines are being used worldwide, with the following types available in Cameroon:</p>
      <ul>
        <li><strong>mRNA vaccines</strong> (Pfizer-BioNTech, Moderna) - Use genetic material to teach cells how to make a protein that triggers an immune response</li>
        <li><strong>Viral vector vaccines</strong> (Johnson & Johnson, AstraZeneca) - Use a modified version of a different virus to deliver instructions to cells</li>
        <li><strong>Protein subunit vaccines</strong> (Novavax) - Include harmless pieces of the virus that trigger an immune response</li>
      </ul>
      
      <h3>Vaccine Efficacy and Protection</h3>
      <p>All approved vaccines:</p>
      <ul>
        <li>Are highly effective at preventing severe disease, hospitalization, and death</li>
        <li>Help reduce the spread of COVID-19 in communities</li>
        <li>Provide protection against variants, though effectiveness may vary</li>
        <li>May require booster doses to maintain optimal protection</li>
      </ul>
      
      <h3>Common Side Effects</h3>
      <p>Most side effects are mild to moderate and resolve within a few days:</p>
      <ul>
        <li>Pain, redness, or swelling at the injection site</li>
        <li>Fatigue</li>
        <li>Headache</li>
        <li>Muscle pain</li>
        <li>Chills or fever</li>
        <li>Nausea</li>
      </ul>
      <p>Serious side effects are extremely rare. The benefits of vaccination far outweigh the risks.</p>
      
      <h3>Vaccination Process in Cameroon</h3>
      <ul>
        <li>Vaccines are available at designated health facilities across the country</li>
        <li>Most vaccines require two doses for full protection</li>
        <li>Bring identification to your appointment</li>
        <li>You'll receive a vaccination card with details about your vaccine</li>
        <li>Continue following public health measures even after vaccination</li>
      </ul>
      
      <h3>Who Should Get Vaccinated</h3>
      <p>COVID-19 vaccines are recommended for:</p>
      <ul>
        <li>Adults of all ages</li>
        <li>Adolescents and children (age eligibility varies by vaccine)</li>
        <li>People with underlying medical conditions</li>
        <li>Pregnant and breastfeeding women (after consulting with healthcare providers)</li>
      </ul>
      
      <p>For the most current information about COVID-19 vaccination in Cameroon, consult the Ministry of Public Health or your healthcare provider.</p>
    `,
    category: 'medical-guides',
    author: 'Dr. Kamto James',
    image_url: 'https://images.unsplash.com/photo-1605289982774-9a6fef564df8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    featured: false
  },
  {
    title: 'Understanding Hypertension',
    description: 'A video guide explaining hypertension, its causes, symptoms, and management strategies.',
    content: `
      <h2>Managing High Blood Pressure</h2>
      <p>Hypertension, or high blood pressure, is often called the "silent killer" because it typically has no symptoms but can lead to serious health problems if left untreated. This guide explains what hypertension is, how it's diagnosed, and how to manage it effectively.</p>
      
      <div class="video-container">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      
      <h3>What is Hypertension?</h3>
      <p>Blood pressure is the force of blood pushing against the walls of your arteries. Hypertension occurs when this pressure is consistently too high. Blood pressure is measured using two numbers:</p>
      <ul>
        <li><strong>Systolic pressure</strong> (top number) - Pressure when the heart beats</li>
        <li><strong>Diastolic pressure</strong> (bottom number) - Pressure when the heart rests between beats</li>
      </ul>
      <p>Normal blood pressure is below 120/80 mm Hg. Hypertension is diagnosed when readings are consistently 130/80 mm Hg or higher.</p>
      
      <h3>Risk Factors</h3>
      <p>Several factors increase your risk of developing hypertension:</p>
      <ul>
        <li>Age (risk increases as you get older)</li>
        <li>Family history</li>
        <li>Being overweight or obese</li>
        <li>Physical inactivity</li>
        <li>Tobacco use</li>
        <li>High sodium (salt) diet</li>
        <li>Low potassium diet</li>
        <li>Excessive alcohol consumption</li>
        <li>Stress</li>
        <li>Certain chronic conditions (diabetes, kidney disease)</li>
      </ul>
      
      <h3>Lifestyle Management</h3>
      <p>These lifestyle changes can help control blood pressure:</p>
      <ul>
        <li><strong>DASH diet</strong> - A diet rich in fruits, vegetables, whole grains, and low-fat dairy, with reduced saturated and total fat</li>
        <li><strong>Reduce sodium</strong> - Aim for less than 1,500 mg per day</li>
        <li><strong>Regular physical activity</strong> - At least 150 minutes of moderate-intensity exercise per week</li>
        <li><strong>Maintain a healthy weight</strong> - Losing even 5-10% of your body weight can help lower blood pressure</li>
        <li><strong>Limit alcohol</strong> - No more than one drink per day for women and two for men</li>
        <li><strong>Quit smoking</strong> - Smoking raises blood pressure and damages blood vessels</li>
        <li><strong>Manage stress</strong> - Practice relaxation techniques like meditation, deep breathing, or yoga</li>
      </ul>
      
      <h3>Medication</h3>
      <p>If lifestyle changes aren't enough, your doctor may prescribe medications such as:</p>
      <ul>
        <li>Diuretics</li>
        <li>ACE inhibitors</li>
        <li>Angiotensin II receptor blockers (ARBs)</li>
        <li>Calcium channel blockers</li>
        <li>Beta-blockers</li>
      </ul>
      <p>It's essential to take medications as prescribed and attend regular follow-up appointments.</p>
      
      <h3>Monitoring Your Blood Pressure</h3>
      <p>Regular monitoring helps track your progress:</p>
      <ul>
        <li>Consider home monitoring with an automated upper arm device</li>
        <li>Take readings at the same time each day</li>
        <li>Keep a log of your readings to share with your healthcare provider</li>
        <li>Follow proper technique for accurate readings</li>
      </ul>
      
      <p>Remember, hypertension is manageable with proper care. Work closely with your healthcare provider to develop a treatment plan that works for you.</p>
    `,
    category: 'educational-videos',
    author: 'Dr. Ngono Marie',
    image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    featured: false,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
];

// Sample pharmacies data
const mockPharmacies = [
  {
    name: 'Central Pharmacy',
    address: '123 Main Street, Douala',
    phone: '+237 654 321 987',
    email: 'central@pharmacy.com',
    hours: 'Mon-Fri: 8am-8pm, Sat: 9am-6pm, Sun: 10am-4pm',
    latitude: 4.0511,
    longitude: 9.7679
  },
  {
    name: 'Health First Pharmacy',
    address: '456 Hospital Road, Yaounde',
    phone: '+237 678 543 210',
    email: 'info@healthfirst.com',
    hours: 'Mon-Sat: 8am-9pm, Sun: 9am-5pm',
    latitude: 3.8480,
    longitude: 11.5021
  },
  {
    name: 'Community Drugstore',
    address: '789 Market Street, Bamenda',
    phone: '+237 699 876 543',
    email: 'community@drugstore.com',
    hours: 'Mon-Fri: 7am-7pm, Sat-Sun: 9am-5pm',
    latitude: 5.9631,
    longitude: 10.1589
  },
  {
    name: '24/7 Pharmacy',
    address: '321 Night Road, Buea',
    phone: '+237 677 123 456',
    email: 'always@open.com',
    hours: 'Open 24 hours, 7 days a week',
    latitude: 4.1527,
    longitude: 9.2920
  }
];

/**
 * Migrates mock doctors to Supabase
 */
export const migrateDoctors = async () => {
  console.log('Starting doctor migration...');
  
  for (const doctor of mockDoctors) {
    try {
      // First create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: doctor.email,
        password: 'Password123!', // Default password
        options: {
          data: {
            full_name: doctor.full_name
          }
        }
      });
      
      if (authError) {
        console.error(`Error creating auth user for ${doctor.email}:`, authError);
        continue;
      }
      
      // Wait a moment for the auth user to be fully created
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Then create the profile
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert([
          {
            id: authData.user.id,
            ...doctor
          }
        ]);
      
      if (profileError) {
        console.error(`Error creating profile for ${doctor.email}:`, profileError);
        continue;
      }
      
      console.log(`Successfully migrated doctor: ${doctor.full_name}`);
    } catch (error) {
      console.error(`Error migrating doctor ${doctor.email}:`, error);
    }
  }
  
  console.log('Doctor migration completed');
};

/**
 * Migrates mock resources to Supabase
 */
export const migrateResources = async () => {
  console.log('Starting resources migration...');
  
  for (const resource of mockResources) {
    try {
      const { error } = await supabase
        .from('resources')
        .insert([
          {
            ...resource,
            created_at: new Date().toISOString()
          }
        ]);
      
      if (error) {
        console.error(`Error creating resource ${resource.title}:`, error);
        continue;
      }
      
      console.log(`Successfully migrated resource: ${resource.title}`);
    } catch (error) {
      console.error(`Error migrating resource ${resource.title}:`, error);
    }
  }
  
  console.log('Resources migration completed');
};

/**
 * Migrates mock pharmacies to Supabase
 */
export const migratePharmacies = async () => {
  console.log('Starting pharmacies migration...');
  
  for (const pharmacy of mockPharmacies) {
    try {
      const { error } = await supabase
        .from('pharmacies')
        .insert([
          {
            ...pharmacy,
            created_at: new Date().toISOString()
          }
        ]);
      
      if (error) {
        console.error(`Error creating pharmacy ${pharmacy.name}:`, error);
        continue;
      }
      
      console.log(`Successfully migrated pharmacy: ${pharmacy.name}`);
    } catch (error) {
      console.error(`Error migrating pharmacy ${pharmacy.name}:`, error);
    }
  }
  
  console.log('Pharmacies migration completed');
};

/**
 * Creates an admin user
 */
export const createAdminUser = async () => {
  console.log('Creating admin user...');
  
  try {
    // First create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'admin@healthdirectory.com',
      password: 'Admin123!',
      options: {
        data: {
          full_name: 'System Administrator'
        }
      }
    });
    
    if (authError) {
      console.error('Error creating admin auth user:', authError);
      return;
    }
    
    // Wait a moment for the auth user to be fully created
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Then create the profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          full_name: 'System Administrator',
          email: 'admin@healthdirectory.com',
          role: 'admin',
          avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
        }
      ]);
    
    if (profileError) {
      console.error('Error creating admin profile:', profileError);
      return;
    }
    
    console.log('Successfully created admin user');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

/**
 * Run all migrations
 */
export const migrateAllData = async () => {
  await createAdminUser();
  await migrateDoctors();
  await migrateResources();
  await migratePharmacies();
  
  console.log('All data migration completed');
};

export default {
  migrateDoctors,
  migrateResources,
  migratePharmacies,
  createAdminUser,
  migrateAllData
};
