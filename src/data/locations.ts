export interface OfficeLocation {
  city: string;
  state: string;
  pincode: string;
  address: string;
  isHeadquarter?: boolean;
}

export const officeLocations: OfficeLocation[] = [
  {
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600018',
    address: 'Maan Sarovar Tower, First Floor 375, 271A, Scheme Rd, Teynampet',
    isHeadquarter: true
  },
  {
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560034',
    address: 'Agrya Consulting Private Limited IndiQube Sigma, Site No. 3/B, 3rd Block, Koramangala'
  },
  {
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500073',
    address: 'Unit no 824 7th Floor, Vasavi MPM Grand Beside Ameerpet Metro, Ameerpet'
  },
  {
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400086',
    address: 'ICRC, Sikova Industrial lane, Suite 1206-07, Ajmera Sikova, Lal Bahadur Shastri Marg, Ghatkopar West'
  }
];
