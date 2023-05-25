import { log } from 'console';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { mongoConnect } from '../../helpers/mongoDB';

import { eapsvu } from '../../models/mongo_schema'

interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

interface AddressWithUnit extends BasicAddress {
  unit: any;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let id = searchParams.get('id');

  await mongoose.connect('mongodb://trial.soidemdt.com:27017/Example',
    {
      authSource: 'admin',
      user: 'Admin',
      pass: 'DTSoidem.918'
    });
    let query;
    if (eapsvu){
    query = await eapsvu.find({_id: "631085bb11f90b135850ea11"});
    }else{
      query = {};
    }
    // console.log('query: ', query);
    return (NextResponse.json({ query }));


  // mongoConnect('trial.soidemdt.com:27017', 'Example').then(conn =>{
  //   console.log(conn);
  //   let IQFEAP = conn.model('EAPSVU', SchemaGeneral, 'eapsVU');
  // })
}