const mapStyle = [
  {
    featureType: 'land',
    elementType: 'geometry',
    stylers: {
      color: '#000000ff'
    }
  },
  {
    featureType: 'building',
    elementType: 'geometry',
    stylers: {
      color: '#000000ff'
    }
  },
  {
    featureType: 'highway',
    elementType: 'all',
    stylers: {
      lightness: -42,
      saturation: -91
    }
  },
  {
    featureType: 'arterial',
    elementType: 'geometry',
    stylers: {
      lightness: -77,
      saturation: -94
    }
  },
  {
    featureType: 'green',
    elementType: 'geometry',
    stylers: {
      color: '#000000ff'
    }
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: {
      color: '#181818'
    }
  },
  {
    featureType: 'subway',
    elementType: 'geometry.stroke',
    stylers: {
      color: '#000000ff'
    }
  },
  {
    featureType: 'railway',
    elementType: 'geometry',
    stylers: {
      lightness: -52
    }
  },
  {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: {
      color: '#000000ff'
    }
  },
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: {
      color: '#8b8787'
    }
  },
  {
    featureType: 'manmade',
    elementType: 'geometry',
    stylers: {
      color: '#000000ff'
    }
  },
  {
    featureType: 'local',
    elementType: 'geometry',
    stylers: {
      lightness: -75,
      saturation: -91
    }
  },
  {
    featureType: 'subway',
    elementType: 'geometry',
    stylers: {
      lightness: -65
    }
  },
  {
    featureType: 'railway',
    elementType: 'all',
    stylers: {
      lightness: -40
    }
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: {
      color: '#3d85c6ff',
      weight: '1',
      lightness: -29
    }
  }
]

export default mapStyle
