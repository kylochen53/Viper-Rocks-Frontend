import { getServerSession } from 'next-auth';
import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';
import { options } from '../../auth/[...nextauth]/options'


export async function GET(req) {
  

    try {
        /*
        const rockQuadrants = await prisma.RockQuadrant.findMany({
         
            include: {
              image: true,
            },
          });*/
        // If images are found, return them

        const rockQuadrants = [{
            "id": 1,
            "imageId": 1,
            "x": 0,
            "y": 0,
            "width": 1000,
            "height": 1000,
            "quadrantNumber": 1,
            "image": {
                "id": 1,
                "imageURL": "https://i.ibb.co/pBTgQcML/IMG-6999.jpg"
            }
        }];

      return new NextResponse(JSON.stringify( rockQuadrants ), { status: 201 });
    } catch (error) {
      console.error('Error fetching quadrants');
      return new NextResponse(JSON.stringify({
        message: 'Internal Server Error',
        error: error.message,
        requestBody: req.body 
      }), { status: 500 });
    }
  }
  