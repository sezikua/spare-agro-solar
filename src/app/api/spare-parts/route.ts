import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '12';
    const offset = searchParams.get('offset') || '0';
    const search = searchParams.get('search') || '';
    
    // Build filter for count query
    let countFilter = '';
    if (search.trim()) {
      countFilter = `&filter[article][_contains]=${encodeURIComponent(search.trim())}`;
    }
    
    // Get total count first
    const countUrl = `http://173.212.215.18:8055/items/spare_parts?limit=0&meta=total_count${countFilter}`;
    const countResponse = await fetch(countUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!countResponse.ok) {
      throw new Error(`Directus count API error: ${countResponse.status}`);
    }

    const countData = await countResponse.json();
    const totalCount = countData.meta?.total_count || 0;
    
    // Get actual data
    let directusUrl = `http://173.212.215.18:8055/items/spare_parts?limit=${limit}&offset=${offset}`;
    
    // Add search filter if search term is provided
    if (search.trim()) {
      // Use Directus filter syntax for searching in article field
      directusUrl += `&filter[article][_contains]=${encodeURIComponent(search.trim())}`;
    }
    
    const response = await fetch(directusUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Directus API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Return data with total count
    return NextResponse.json({
      ...data,
      meta: {
        ...data.meta,
        total_count: totalCount
      }
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch spare parts' },
      { status: 500 }
    );
  }
}
