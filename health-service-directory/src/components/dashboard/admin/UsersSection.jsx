import { useState, useEffect } from 'react';
import { 
  UserGroupIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
// Mock data - no Supabase needed

export default function UsersSection() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // TODO: Replace with mock data or new backend logic
    setUsers([]);
    setLoading(false);
    // fetchUsers();
  }, []);
  
  // async function fetchUsers() {
  //   ... (all supabase code commented out)
  // }

  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'patient',
    status: 'active'
  });
  const [editUser, setEditUser] = useState({
    id: null,
    name: '',
    email: '',
    role: '',
    status: ''
  });

  const handleNewUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      // Call the backend to create the user
      const response = await fetch('http://localhost:4000/admin/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newUser.email,
          password: 'tempPassword123', // Consider a more secure way to handle passwords
          user_metadata: {
            name: newUser.name,
            role: newUser.role,
            // email: newUser.email // email is top-level, not needed in user_metadata here
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create user');
      }

      // The backend now handles Supabase Auth user creation.
      // If your backend also handles creating the profile and role-specific entries,
      // you might not need the following Supabase calls on the client-side.
      // For now, let's assume the backend primarily handles the auth user.
      // We'll keep the profile/role creation here but link it to the user ID from the backend response.

      const authUserId = data.user.id; // Get user ID from backend response

      // Create a profile record
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ 
          id: authUserId, // Use ID from backend response
          name: newUser.name,
          role: newUser.role,
          email: newUser.email 
        }]);
      
      if (profileError) throw profileError;
      
      // Create role-specific record if needed
      if (newUser.role === 'doctor') {
        const { error: doctorError } = await supabase
          .from('doctors')
          .insert([{ id: authUserId }]); // Use ID from backend response
        
        if (doctorError) throw doctorError;
      } else if (newUser.role === 'patient') {
        const { error: patientError } = await supabase
          .from('patients')
          .insert([{ id: authUserId }]); // Use ID from backend response
        
        if (patientError) throw patientError;
      }
      
      fetchUsers();
      setShowNewUserModal(false);
      setNewUser({
        name: '',
        email: '',
        role: 'patient',
        status: 'active'
      });
    } catch (error) {
      console.error('Error adding user:', error.message);
      alert('Failed to add user: ' + error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      // First check if this user has a role-specific record
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      
      if (profileError) throw profileError;
      
      // Delete role-specific record if it exists
      if (profileData.role === 'doctor') {
        const { error: doctorError } = await supabase
          .from('doctors')
          .delete()
          .eq('id', userId);
        
        if (doctorError) throw doctorError;
      } else if (profileData.role === 'patient') {
        const { error: patientError } = await supabase
          .from('patients')
          .delete()
          .eq('id', userId);
        
        if (patientError) throw patientError;
      }
      
      // Delete the profile record
      const { error: deleteProfileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);
      
      if (deleteProfileError) throw deleteProfileError;
      
      // Note: In a real application, you might want to handle deleting the auth user as well,
      // but that requires admin privileges and careful consideration of data integrity
      
      // Refresh the users list
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error.message);
      alert('Failed to delete user: ' + error.message);
    }
  };

  const handleEditClick = (user) => {
    setEditUser({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setShowEditUserModal(true);
  };

  const handleEditUserInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      // Get the current role of the user
      const { data: currentUserData, error: fetchError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', editUser.id)
        .single();
      
      if (fetchError) throw fetchError;
      
      // If the role has changed, we need to handle role-specific records
      if (currentUserData.role !== editUser.role) {
        // Delete old role-specific record
        if (currentUserData.role === 'doctor') {
          await supabase
            .from('doctors')
            .delete()
            .eq('id', editUser.id);
        } else if (currentUserData.role === 'patient') {
          await supabase
            .from('patients')
            .delete()
            .eq('id', editUser.id);
        }
        
        // Create new role-specific record
        if (editUser.role === 'doctor') {
          await supabase
            .from('doctors')
            .insert([{ id: editUser.id }]);
        } else if (editUser.role === 'patient') {
          await supabase
            .from('patients')
            .insert([{ id: editUser.id }]);
        }
      }
      
      // Update the profile record
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          name: editUser.name,
          role: editUser.role,
          // Don't update email here as that would require auth changes too
        })
        .eq('id', editUser.id);
      
      if (updateError) throw updateError;
      
      // Refresh the users list
      fetchUsers();
      
      // Reset form and close modal
      setShowEditUserModal(false);
      setEditUser({
        id: null,
        name: '',
        email: '',
        role: '',
        status: ''
      });
    } catch (error) {
      console.error('Error updating user:', error.message);
      alert('Failed to update user: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">Users Management</h2>
        <button 
          onClick={() => setShowNewUserModal(true)}
          className="flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New User
        </button>
      </div>

      {/* New User Modal */}
      {showNewUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add New User</h3>
              <button
                onClick={() => setShowNewUserModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleNewUserInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleNewUserInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  name="role"
                  value={newUser.role}
                  onChange={handleNewUserInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={newUser.status}
                  onChange={handleNewUserInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewUserModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative z-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Edit User</h3>
              <button
                onClick={() => setShowEditUserModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editUser.name}
                  onChange={handleEditUserInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editUser.email}
                  onChange={handleEditUserInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  name="role"
                  value={editUser.role}
                  onChange={handleEditUserInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={editUser.status}
                  onChange={handleEditUserInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditUserModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-blue-200 rounded-full mb-4"></div>
            <div className="h-4 bg-blue-100 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-blue-50 rounded w-1/4"></div>
          </div>
          <p className="mt-4 text-gray-500">Loading users...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <UserGroupIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No users found</h3>
          <p className="text-gray-500">Add your first user to get started.</p>
          <button 
            onClick={() => setShowNewUserModal(true)}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Add User
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <UserGroupIcon className="h-6 w-6 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'doctor' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status || 'active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleEditClick(user)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 